import 'es-module-lexer';
import './chunks/astro-designed-error-pages_xzh6Lbvg.mjs';
import 'kleur/colors';
import './chunks/astro/server_BcdccBRb.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/sequence_CG0gN-Jp.mjs';
import { s as safeGetWebsiteConfig } from './chunks/config_CQtV1zSN.mjs';
import { a as authMiddleware } from './chunks/authMiddleware_DLP4dulR.mjs';
import { d as defineMiddleware } from './chunks/index_CHc9X1YU.mjs';
import { g as getInstanceLogger } from './chunks/logger_Dvk4x2et.mjs';
import { c as cleanOrganism } from './chunks/cleanOrganism_Dc4DF_FJ.mjs';

const logger = getInstanceLogger("ErrorMiddleware");
const catchErrorMiddleware = defineMiddleware(async (context, next) => {
  try {
    return await next();
  } catch (error) {
    logger.error(`Error for path (${context.url.pathname}): ${error}`);
    return context.redirect("/500");
  }
});

const organismValidatorMiddleware = defineMiddleware(async (context, next) => {
  const organism = context.params.organism;
  if (organism === void 0) {
    return next();
  }
  const { organism: validatedOrganism } = cleanOrganism(organism);
  if (validatedOrganism === void 0) {
    return new Response(void 0, { status: 404 });
  }
  return next();
});

const submissionPagesDisablingMiddleware = defineMiddleware(async (context, next) => {
  const organism = context.params.organism;
  if (organism !== void 0 && context.url.pathname.includes(`${organism}/submission`)) {
    return context.rewrite("/404");
  }
  return next();
});

const middlewares = [catchErrorMiddleware, organismValidatorMiddleware, authMiddleware];
if (!(safeGetWebsiteConfig()?.enableSubmissionPages ?? false)) {
  middlewares.push(submissionPagesDisablingMiddleware);
}
const onRequest$1 = sequence(...middlewares);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
