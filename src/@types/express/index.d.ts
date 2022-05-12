declare namespace Express {
	export interface Request {
		amountOfRequests: number;
		ttl: number;
	}
}
