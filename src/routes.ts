import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { rateLimiter } from './middlewares/rateLimiter';

const routes: Router = Router();

// const PUBLIC_LIMIT: number = 100;
const PUBLIC_LIMIT: number = 10;
const PRIVATE_LIMIT: number = 200;
// const ONE_HOUR_IN_SECONDS: number = 3600;
const ONE_HOUR_IN_SECONDS: number = 30; //10 segundos

routes.post(
	'/public',
	rateLimiter({ requestsPerHour: PUBLIC_LIMIT, hourInSeconds: ONE_HOUR_IN_SECONDS }),
	async (request: Request, response: Response) => {
		return response.json({
			route: request.path,
			callInAMinute: request.amountOfRequests,
			ttl: request.ttl,
		});
	},
);

routes.post(
	'/private',
	ensureAuthenticated,
	rateLimiter({ requestsPerHour: PRIVATE_LIMIT, hourInSeconds: ONE_HOUR_IN_SECONDS }),
	(request: Request, response: Response) => {
		return response.json({
			route: request.path,
			callInAMinute: request.amountOfRequests,
			ttl: request.ttl,
		});
	},
);

export { routes };
