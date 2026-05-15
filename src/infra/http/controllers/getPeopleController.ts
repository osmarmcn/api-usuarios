
import { makeGetPeopleUseCase } from "@/infra/factories/person-factory";
import { NextFunction, Request, Response } from "express";


export class GetPeopleController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const getPeopleUseCase = makeGetPeopleUseCase()
      
      const people = await getPeopleUseCase.execute()
      
      return response.json(people)
    } catch (error) {
      next(error)
    }
  }
}