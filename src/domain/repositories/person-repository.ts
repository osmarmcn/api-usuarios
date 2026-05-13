import { Person } from "../entities/person"


export interface IPersonRepository {

    create(person: Person): Promise<Person>

    findByEmail(email: string): Promise<Person | null>
    findByCpf(cpf: string): Promise<Person | null>
    findByPhone(phone: string): Promise<Person | null>

    findAll(): Promise<Person[]>
}