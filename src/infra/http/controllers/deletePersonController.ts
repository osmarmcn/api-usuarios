import { makeDeletePersonUseCase } from "@/infra/factories/person-factory";
import { NextFunction, Request, Response } from "express";


export class DeletePersonController {

    async handle(request: Request<{ id: string }>, response: Response, next: NextFunction) {

        try{
            const { id } = request.params
            const useCase = makeDeletePersonUseCase()
            await useCase.execute({ id })
            return response.status(204).send()

        } catch (error) {
            next(error)
        }
        
    }
}