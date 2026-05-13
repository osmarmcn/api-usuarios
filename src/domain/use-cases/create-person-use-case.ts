import { randomUUID } from "node:crypto"
import { Person } from "../entities/person"
import { IPersonRepository } from "../repositories/person-repository"
import { AppError } from "@/core/errors/app-error"


interface CreatePersonRequest {
    name: string
    email: string
    cpf: string
    phone: string
    address: string
    gender?: string
    profession?: string
    education?: string
}

export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ){}

    async execute(data: CreatePersonRequest): Promise<Person> {

        const emailAlreadyExists = await this.personRepository.findByEmail(data.email)

        if (emailAlreadyExists) {
            throw new AppError("Email already exists", 409)
        }

        const cpfAlreadyExists = await this.personRepository.findByCpf(data.cpf)

        if (cpfAlreadyExists) {
            throw new AppError("CPF already exists", 409)
        }

        const phoneAlreadyExists = await this.personRepository.findByPhone(data.phone)

        if (phoneAlreadyExists) {
            throw new AppError("Phone already exists", 409)
        }

        const person = new Person(
            
            randomUUID(),
            data.name,
            data.email,
            data.cpf,
            data.phone,
            data.address,
            data.gender ?? '',
            data.profession ?? '',
            data.education ?? ''
        )

        const createdPerson = await this.personRepository.create(person)

        return createdPerson
        
    }
}