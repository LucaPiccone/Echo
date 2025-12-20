export class ValidationError extends Error {
    status = 400;
}
export class ConflictError extends Error {
    status = 409;
}

export class SessionNotFoundError extends Error {
    status = 401;
}

export class InternalServerError extends Error {
    status = 500;
}