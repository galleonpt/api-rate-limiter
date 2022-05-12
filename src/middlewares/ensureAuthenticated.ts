import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET: string = 'secret';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authToken: string = request.headers.authorization;

	if (!authToken) return response.status(401).end();

	const [, token] = authToken.split(' ');

	try {
		verify(token, JWT_SECRET);

		return next();
	} catch (e) {
		console.log(e);
		return response.status(401).end();
	}
}
