import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authToken: string = request.headers.authorization;

	if (!authToken) return response.status(401).end();

	const [, token] = authToken.split(' ');

	try {
		verify(token, config.JWT_SECRET);

		return next();
	} catch (e) {
		return response.status(401).end();
	}
}
