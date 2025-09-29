import 'openid-client';
import { r as realmPath } from './getAuthUrl_CP-cK5RK.mjs';

function urlForKeycloakAccountPage(client) {
  const endsessionUrl = client.endSessionUrl();
  const url = new URL(endsessionUrl);
  return `${url.protocol}//${url.host}${realmPath}/account`;
}

export { urlForKeycloakAccountPage as u };
