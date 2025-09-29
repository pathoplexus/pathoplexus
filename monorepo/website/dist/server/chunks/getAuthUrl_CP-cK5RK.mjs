import { Issuer } from 'openid-client';
import { a as getRuntimeConfig } from './config_CQtV1zSN.mjs';
import { g as getInstanceLogger } from './logger_Dvk4x2et.mjs';
import { r as routes } from './routes_BftQyUXo.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const clientMetadata = {
  client_id: "backend-client",
  response_types: ["code", "id_token"],
  public: true
};
const getClientMetadata = () => {
  return { ...clientMetadata, client_secret: getClientSecret() };
};
const getClientSecret = () => {
  if (Object.assign(__vite_import_meta_env__, { CONFIG_DIR: "./tests/config", _: process.env._ }) === void 0) {
    return "dummySecret";
  }
  return getRuntimeConfig().backendKeycloakClientSecret;
};

const realmPath = "/realms/loculus";

let _keycloakClient;
const logger = getInstanceLogger("KeycloakClientManager");
const KeycloakClientManager = {
  getClient: async () => {
    if (_keycloakClient !== void 0) {
      return _keycloakClient;
    }
    const originForClient = getRuntimeConfig().serverSide.keycloakUrl;
    const issuerUrl = `${originForClient}${realmPath}`;
    logger.info(`Getting keycloak client for issuer url: ${issuerUrl}`);
    try {
      const keycloakIssuer = await Issuer.discover(issuerUrl);
      logger.info(`Keycloak issuer discovered: ${issuerUrl}`);
      _keycloakClient = new keycloakIssuer.Client(getClientMetadata());
    } catch (error) {
      if (error?.code !== "ECONNREFUSED") {
        logger.error(`Error discovering keycloak issuer: ${error}`);
        throw error;
      }
      logger.warn(`Connection refused when trying to discover the keycloak issuer at url: ${issuerUrl}`);
    }
    return _keycloakClient;
  }
};

const getAuthUrl = async (redirectUrl) => {
  const logout = routes.logout();
  if (redirectUrl.endsWith(logout)) {
    redirectUrl = redirectUrl.replace(logout, routes.userOverviewPage());
  }
  const client = await KeycloakClientManager.getClient();
  if (client === void 0) {
    return `/503?service=Authentication`;
  }
  return client.authorizationUrl({
    redirect_uri: redirectUrl,
    scope: "openid",
    response_type: "code"
  });
};
const getAuthBaseUrl = async () => {
  const authUrl = await getAuthUrl("/");
  const index = authUrl.indexOf("/realms");
  if (index === -1) {
    return null;
  }
  return authUrl.substring(0, index);
};

export { KeycloakClientManager as K, getAuthBaseUrl as a, getAuthUrl as g, realmPath as r };
