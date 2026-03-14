import type { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    // If headers already sent, pass to default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        error: {
            status: statusCode,
            message: message,
            // Include stack trace only in development mode
            ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
        },
    });
};
