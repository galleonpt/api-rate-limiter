import { NextFunction, Request, Response } from 'express';
import { redis } from '../redis-client';

export function rateLimiter({ requestsPerHour, hourInSeconds }) {
	return async function (request: Request, response: Response, next: NextFunction) {
		let userInfo;

		if (request.path.includes('private')) {
			userInfo = request.headers.authorization.split(' ')[1];
		} else {
			userInfo = request.ip.split(':').slice(-1)[0];
		}

		const amountOfRequests: number = await redis.incr(userInfo);

		let ttl;
		if (amountOfRequests === 1) {
			await redis.expire(userInfo, hourInSeconds);
			ttl = hourInSeconds;
		} else {
			ttl = await redis.ttl(userInfo);
		}

		if (amountOfRequests > requestsPerHour) {
			return response.status(503).json({
				error: `You made to many requests(${amountOfRequests}). Wait ${ttl} seconds to be able to make more requests.`,
				// ttl,
			});
		} else {
			request.amountOfRequests = amountOfRequests;
			request.ttl = ttl;
			next();
		}
	};
}
