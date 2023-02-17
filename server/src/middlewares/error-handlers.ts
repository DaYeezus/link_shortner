import {Request,Response,NextFunction} from "express"
import {NotFound} from "http-errors"
export function serverErrorHandler(err:any,req:Request,res:Response,next:NextFunction):void {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        status,
        message
    })
    next();
}
export function notFoundHandler(req:Request,res:Response,next:NextFunction):void {
    next(NotFound("Path you looking for doesn't exist"));
}
