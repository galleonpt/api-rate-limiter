import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { rateLimiter } from './middlewares/rateLimiter';
import config from './config/config';

const routes: Router = Router();

routes.post(
	'/public',
	rateLimiter({ requestsPerHour: config.IP_LIMIT, hourInSeconds: config.ONE_HOUR_IN_SECONDS }),
	async (request: Request, response: Response) => {
		return response.json({
			route: request.path,
			amountOfRequests: request.amountOfRequests,
			ttl: request.ttl,
		});
	},
);

routes.post(
	'/private',
	ensureAuthenticated,
	rateLimiter({ requestsPerHour: config.TOKEN_LIMIT, hourInSeconds: config.ONE_HOUR_IN_SECONDS }),
	(request: Request, response: Response) => {
		return response.json({
			route: request.path,
			amountOfRequests: request.amountOfRequests,
			ttl: request.ttl,
		});
	},
);

export { routes };
