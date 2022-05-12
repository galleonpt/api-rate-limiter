import { NextFunction, Request, Response } from 'express';
import { redis } from '../redis-client';

export function rateLimiter({ requestsPerHour, hourInSeconds }) {
	return async function (request: Request, response: Response, next: NextFunction) {
		const userIP: string = request.ip.split(':').slice(-1)[0];

		const amountOfRequests: number = await redis.incr(userIP);

		//Quando for o primeiro request definir o expire time no redis para aquele ip especifico
		let ttl; //time to live -> tempo que demora a dar reset a cache do redis. 100 requests per hour. o meu ttl = 1h(colocar em segundos)
		if (amountOfRequests === 1) {
			await redis.expire(userIP, hourInSeconds);
			ttl = hourInSeconds;
		} else {
			ttl = await redis.ttl(userIP);
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
