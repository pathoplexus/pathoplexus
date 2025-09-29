import { makeParameters, makeErrors } from '@zodios/core';
import z from 'zod';
import { m as problemDetail } from './config_CQtV1zSN.mjs';

const [authorizationHeader] = makeParameters([
  {
    name: "Authorization",
    type: "Header",
    schema: z.string().includes("Bearer ", { position: 0 })
  }
]);
function withOrganismPathSegment(path) {
  return `/:organism${path}`;
}
const notAuthorizedError = makeErrors([
  {
    status: 401,
    schema: z.never()
  }
])[0];
const conflictError = { status: 409, schema: problemDetail };

export { authorizationHeader as a, conflictError as c, notAuthorizedError as n, withOrganismPathSegment as w };
