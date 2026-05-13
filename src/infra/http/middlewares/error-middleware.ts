import { AppError } from "@/core/errors/app-error";
import { NextFunction, Request, Response } from "express";

export function errorMiiddleware(error: Error, request: Request, response: Response, next: NextFunction){

    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        message: "Internal server error"
    })
}