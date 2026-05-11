import { randomUUID } from "node:crypto"
import { Person } from "../entities/person"
import { IPersonRepository } from "../repositories/person-repository"


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
            throw new Error("Email already exists")
        }

        const cpfAlreadyExists = await this.personRepository.findByCpf(data.cpf)

        if (cpfAlreadyExists) {
            throw new Error("CPF already exists")
        }

        const phoneAlreadyExists = await this.personRepository.findByPhone(data.phone)

        if (phoneAlreadyExists) {
            throw new Error("Phone already exists")
        }

        const person = new Person(
            
            randomUUID(),
            data.name,
            data.email,
            data.cpf,
            data.phone,
            data.address,
            data.gender,
            data.profession,
            data.education,
        )

        const createdPerson = await this.personRepository.create(person)

        return createdPerson
        
    }
}