import { d as defineMiddleware } from './index_CHc9X1YU.mjs';
import jsonwebtoken from 'jsonwebtoken';
import JwksRsa from 'jwks-rsa';
import { ResultAsync, err, ok } from 'neverthrow';
import 'openid-client';
import { g as getConfiguredOrganisms, a as getRuntimeConfig } from './config_CQtV1zSN.mjs';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';
import { K as KeycloakClientManager, g as getAuthUrl } from './getAuthUrl_CP-cK5RK.mjs';

const enforcedLoginRoutesCache = {};
function getEnforcedLoginRoutes(configuredOrganisms) {
  const cacheKey = configuredOrganisms.join("");
  if (!(cacheKey in enforcedLoginRoutesCache)) {
    const organismSpecificRoutes = configuredOrganisms.flatMap((organism) => [
      new RegExp(`^/${organism}/user`),
      new RegExp(`^/${organism}/my_sequences`)
    ]);
    enforcedLoginRoutesCache[cacheKey] = [new RegExp("^/user/?"), ...organismSpecificRoutes];
  }
  return enforcedLoginRoutesCache[cacheKey];
}
function shouldMiddlewareEnforceLogin(pathname, configuredOrganisms) {
  return getEnforcedLoginRoutes(configuredOrganisms).some((route) => route.test(pathname));
}

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const logger = getInstanceLogger("LoginMiddleware");
async function getValidTokenAndUserInfoFromCookie(context, client) {
  logger.debug(`Trying to get token and user info from cookie`);
  const token = await getTokenFromCookie(context, client);
  if (token !== void 0) {
    const userInfo = await getUserInfo(token, client);
    if (userInfo.isErr()) {
      logger.debug(`Cookie token found but could not get user info`);
      deleteCookie(context);
      return void 0;
    }
    logger.debug(`Token and valid user info found in cookie`);
    return {
      token,
      userInfo
    };
  }
  return void 0;
}
async function getValidTokenAndUserInfoFromParams(context, client) {
  logger.debug(`Trying to get token and user info from params`);
  const token = await getTokenFromParams(context, client);
  if (token !== void 0) {
    const userInfo = await getUserInfo(token, client);
    if (userInfo.isErr()) {
      logger.debug(`Token found in params but could not get user info`);
      return void 0;
    }
    logger.debug(`Token and valid user info found in params`);
    return {
      token,
      userInfo
    };
  }
  return void 0;
}
const authMiddleware = defineMiddleware(async (context, next) => {
  let token;
  let userInfo;
  const client = await KeycloakClientManager.getClient();
  if (client !== void 0) {
    const cookieResult = await getValidTokenAndUserInfoFromCookie(context, client);
    token = cookieResult?.token;
    userInfo = cookieResult?.userInfo;
    if (token === void 0) {
      const paramResult = await getValidTokenAndUserInfoFromParams(context, client);
      token = paramResult?.token;
      userInfo = paramResult?.userInfo;
      if (token !== void 0) {
        logger.debug(`Token found in params, setting cookie`);
        setCookie(context, token);
        return createRedirectWithModifiableHeaders(removeTokenCodeFromSearchParams(context.url));
      }
    }
  } else {
    logger.warn(`Keycloak client not available, pretending user logged out`);
  }
  const enforceLogin = shouldMiddlewareEnforceLogin(
    context.url.pathname,
    getConfiguredOrganisms().map((it) => it.key)
  );
  if (enforceLogin && (userInfo === void 0 || userInfo.isErr())) {
    if (client === void 0) {
      logger.error(`Keycloak client not available, cannot redirect to auth`);
      return context.redirect("/503?service=Authentication");
    }
    return redirectToAuth(context);
  }
  if (token === void 0 || userInfo === void 0) {
    context.locals.session = {
      isLoggedIn: false
    };
    return next();
  }
  if (userInfo.isErr()) {
    context.locals.session = {
      isLoggedIn: false
    };
    logger.debug(`Error getting user info: ${userInfo.error}`);
    logger.debug(`Clearing auth cookies.`);
    deleteCookie(context);
    return next();
  }
  context.locals.session = {
    isLoggedIn: true,
    user: {
      name: userInfo.value.name ?? "Name not set",
      username: userInfo.value.preferred_username,
      email: userInfo.value.email,
      emailVerified: userInfo.value.email_verified
    },
    token
  };
  return next();
});
async function getTokenFromCookie(context, client) {
  const accessToken = context.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = context.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (accessToken === void 0 || refreshToken === void 0) {
    return void 0;
  }
  const tokenCookie = {
    accessToken,
    refreshToken
  };
  const verifiedTokenResult = await verifyToken(accessToken, client);
  if (verifiedTokenResult.isErr() && verifiedTokenResult.error.type === 0 /* EXPIRED */) {
    logger.debug(`Token expired, trying to refresh`);
    return refreshTokenViaKeycloak(tokenCookie, client);
  }
  if (verifiedTokenResult.isErr()) {
    logger.info(`Error verifying token: ${verifiedTokenResult.error.message}`);
    return void 0;
  }
  logger.debug(`Token successfully verified, returning it`);
  return tokenCookie;
}
async function verifyToken(accessToken, client) {
  logger.debug(`Verifying token`);
  const tokenHeader = jsonwebtoken.decode(accessToken, { complete: true })?.header;
  const kid = tokenHeader?.kid;
  if (kid === void 0) {
    return err({
      type: 2 /* INVALID_TOKEN */,
      message: "Token does not contain kid"
    });
  }
  if (client.issuer.metadata.jwks_uri === void 0) {
    return err({
      type: 1 /* REQUEST_ERROR */,
      message: `Keycloak client does not contain jwks_uri: ${JSON.stringify(client.issuer.metadata.jwks_uri)}`
    });
  }
  const jwksClient = new JwksRsa.JwksClient({
    jwksUri: client.issuer.metadata.jwks_uri
  });
  try {
    const signingKey = await jwksClient.getSigningKey(kid);
    return ok(jsonwebtoken.verify(accessToken, signingKey.getPublicKey()));
  } catch (error) {
    logger.debug(`Error verifying token: ${error}`);
    switch (error.name) {
      case "TokenExpiredError":
        return err({
          type: 0 /* EXPIRED */,
          message: error.message
        });
      case "JsonWebTokenError":
        return err({
          type: 2 /* INVALID_TOKEN */,
          message: error.message
        });
      default:
        return err({
          type: 1 /* REQUEST_ERROR */,
          message: error.message
        });
    }
  }
}
async function getUserInfo(token, client) {
  return ResultAsync.fromPromise(client.userinfo(token.accessToken), (error) => {
    logger.debug(`Error getting user info: ${error}`);
    return error;
  });
}
async function getTokenFromParams(context, client) {
  const params = client.callbackParams(context.url.toString());
  logger.debug(`Keycloak callback params: ${JSON.stringify(params)}`);
  if (params.code !== void 0) {
    const redirectUri = removeTokenCodeFromSearchParams(context.url);
    logger.debug(`Keycloak callback redirect uri: ${redirectUri}`);
    const tokenSet = await client.callback(redirectUri, params, {
      response_type: "code"
      // eslint-disable-line @typescript-eslint/naming-convention
    }).catch((error) => {
      logger.info(`Keycloak callback error: ${error}`);
      return void 0;
    });
    return extractTokenCookieFromTokenSet(tokenSet);
  }
  return void 0;
}
function setCookie(context, token) {
  const runtimeConfig = getRuntimeConfig();
  logger.debug(`Setting token cookie`);
  context.cookies.set(ACCESS_TOKEN_COOKIE, token.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: !runtimeConfig.insecureCookies,
    path: "/"
  });
  context.cookies.set(REFRESH_TOKEN_COOKIE, token.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: !runtimeConfig.insecureCookies,
    path: "/"
  });
}
function deleteCookie(context) {
  logger.debug(`Deleting token cookie`);
  try {
    context.cookies.delete(ACCESS_TOKEN_COOKIE, { path: "/" });
    context.cookies.delete(REFRESH_TOKEN_COOKIE, { path: "/" });
  } catch {
    logger.info(`Error deleting cookie`);
  }
}
const createRedirectWithModifiableHeaders = (url) => {
  logger.debug(`Redirecting to ${url}`);
  const redirect = Response.redirect(url);
  return new Response(null, { status: redirect.status, headers: redirect.headers });
};
const redirectToAuth = async (context) => {
  const currentUrl = context.url;
  const redirectUrl = removeTokenCodeFromSearchParams(currentUrl);
  logger.debug(`Redirecting to auth with redirect url: ${redirectUrl}`);
  const authUrl = await getAuthUrl(redirectUrl);
  deleteCookie(context);
  return createRedirectWithModifiableHeaders(authUrl);
};
function removeTokenCodeFromSearchParams(url) {
  const newUrl = new URL(url.toString());
  newUrl.searchParams.delete("code");
  newUrl.searchParams.delete("session_state");
  newUrl.searchParams.delete("iss");
  return newUrl.toString();
}
async function refreshTokenViaKeycloak(token, client) {
  const refreshedTokenSet = await client.refresh(token.refreshToken).catch(() => {
    logger.info(`Failed to refresh token`);
    return void 0;
  });
  return extractTokenCookieFromTokenSet(refreshedTokenSet);
}
function extractTokenCookieFromTokenSet(tokenSet) {
  const accessToken = tokenSet?.access_token;
  const refreshToken = tokenSet?.refresh_token;
  if (tokenSet === void 0 || accessToken === void 0 || refreshToken === void 0) {
    logger.error(`Error extracting token cookie from token set`);
    return void 0;
  }
  return {
    accessToken,
    refreshToken
  };
}

export { ACCESS_TOKEN_COOKIE as A, REFRESH_TOKEN_COOKIE as R, authMiddleware as a };
