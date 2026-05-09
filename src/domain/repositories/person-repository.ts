import { Person } from "../use-cases/person";

export interface IPersonRepository {

    create(person: Person): Promise<Person>

    findByEmail(email: string): Promise<Person | null>
    findByCpf(cpf: string): Promise<Person | null>
}