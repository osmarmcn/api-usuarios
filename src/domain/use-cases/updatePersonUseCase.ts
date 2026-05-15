import { AppError } from "@/core/errors/app-error";
import { IPersonRepository } from "../repositories/person-repository";
import { Person } from "../entities/person";
import { object } from "zod";

interface UpdatePersonRequest {
  id: string

  name?: string
  email?: string
  phone?: string
  address?: string
  gender?: string
  profession?: string
  education?: string
}

export class UpdatePersonUseCase {
    constructor(
        private personRepository: IPersonRepository,
    ) {}

    async execute(data: UpdatePersonRequest): Promise<Person> {
        const person = await this.personRepository.findById(data.id)

        if (!person) {
            throw new AppError('Person not found', 404)
        }

        if (data.email && data.email !== person.email) {
            const emailAlreadyExists = await this.personRepository.findByEmail(data.email)

            if (emailAlreadyExists) {
                throw new AppError('Email already exists', 409)
            }
        }


        if (data.phone && data.phone !== person.phone) {
            const phoneAlreadyExists = await this.personRepository.findByPhone(data.phone)

            if (phoneAlreadyExists) {
                throw new AppError('Phone already exists', 409)
            }
        }

        Object.assign(person, data)

        const updatedPerson = await this.personRepository.save(person)

        return updatedPerson

        
    }
}