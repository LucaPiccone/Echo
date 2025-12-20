export class ValidationError extends Error {
    status = 400;
}
export class ConflictError extends Error {
    status = 409;
}