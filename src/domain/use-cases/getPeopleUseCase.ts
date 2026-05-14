import { Person } from "../entities/person";
import { IPersonRepository } from "../repositories/person-repository";


export class GetPeopleUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(): Promise<Person[]> {

        const people = await this.personRepository.findAll()

        return people
    }
}