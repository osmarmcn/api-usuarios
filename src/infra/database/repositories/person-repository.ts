import { IPersonRepository } from "@/domain/repositories/person-repository";
import { AppDataSource } from "../typeorm/data-source";
import { PersonEntity } from "../typeorm/entities/person-entity";
import { Repository } from "typeorm";
import { Person } from "@/domain/entities/person";


export class PersonRepository implements IPersonRepository {
  private repository: Repository<PersonEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(PersonEntity)
  }

  private toDomain(entity: PersonEntity): Person {
    return new Person(
      entity.id,
      entity.name,
      entity.email,
      entity.cpf,
      entity.phone,
      entity.address,
      entity.gender ?? '',
      entity.profession ?? '',
      entity.education ?? '',
    )
  }

  async create(person: Person): Promise<Person> {
    const personEntity = this.repository.create(person);
    const savedPerson = await this.repository.save(personEntity)
    return this.toDomain(savedPerson)
  }

  async findByEmail(email: string): Promise<Person | null> {
    const person = await this.repository.findOne({ where: { email } })
    return person ? this.toDomain(person) : null
  }

  async findByCpf(cpf: string): Promise<Person | null> {
    const person = await this.repository.findOne({ where: { cpf } })
    return person ? this.toDomain(person) : null
  }

  async findByPhone(phone: string): Promise<Person | null> {
    const person = await this.repository.findOne({ where: { phone } })
    return person ? this.toDomain(person) : null
  }

  async findAll(): Promise<Person[]> {
    const people = await this.repository.find();
    return people.map(person => this.toDomain(person))
  }

  async findById(id: string): Promise<Person | null> {
    const person = await this.repository.findOne({ where: { id } })
    return person ? this.toDomain(person) : null
  }

  async save(person: Person): Promise<Person> {
    const savedPerson = await this.repository.save(person)
    return this.toDomain(savedPerson)
  }

}




