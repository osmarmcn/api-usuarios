import { NextFunction, Request, Response } from "express";
import { updatePersonSchema } from "../schemas/update-person-schema";
import { makeUpdatePersonUseCase } from "@/infra/factories/person-factory";

export class UpdatePersonController {

    async handle(request: Request<{ id: string }>, response: Response, next: NextFunction) {
        try {

            const { id } = request.params
            const body = updatePersonSchema.parse(request.body)
            const useCase = makeUpdatePersonUseCase()
            const person = await useCase.execute({ id, ...body })
            response.json(person)
            
        } catch (error) {
            next(error)
        }
    }
}