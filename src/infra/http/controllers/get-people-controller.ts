import { GetPeopleUseCase } from "@/domain/use-cases/get-people-use-case";
import { PersonRepository } from "@/infra/database/repositories/person-repository";
import { NextFunction, Request, Response } from "express";


export class GetPeopleController {

    async handle(request: Request, response: Response, next: NextFunction) {
        try{
            const personRepository = new PersonRepository()
            const getPeopleUseCase = new GetPeopleUseCase(personRepository)
            const people = await getPeopleUseCase.execute()
            return response.json(people)

        } catch (error) {
            next(error)
        }
        

    }
}