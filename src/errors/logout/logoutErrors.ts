export class SessionNotFoundError extends Error {
    status = 401;
}

export class InternalServerError extends Error {
    status = 500;
}