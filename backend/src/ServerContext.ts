import { Request, Response } from "express";
import { ServerError } from "./helpers/ServerError";
import { ValidationError } from "./validators/ValidationError";

export interface ServerContext {
    req: Request,
    res: Response,
    payload: { id: string, error?: ServerError, validation_errors?: ValidationError[] }
}