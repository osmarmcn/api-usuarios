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

  async create(person: Person): Promise<Person> {
    const personEntity = this.repository.create({
      id: person.id,
      name: person.name,
      email: person.email,
      cpf: person.cpf,
      phone: person.phone,
      address: person.address,
      gender: person.gender,
      profession: person.profession,
      education: person.education,
    })

    const savedPerson = await this.repository.save(personEntity)

    return new Person(
      savedPerson.id,
      savedPerson.name,
      savedPerson.email,
      savedPerson.cpf,
      savedPerson.phone,
      savedPerson.address,
      savedPerson.gender,
      savedPerson.profession,
      savedPerson.education,
    )
  }

  async findByEmail(email: string): Promise<Person | null> {
    const person = await this.repository.findOne({
      where: { email },
    })

    if (!person) {
      return null
    }

    return new Person(
      person.id,
      person.name,
      person.email,
      person.cpf,
      person.phone,
      person.address,
      person.gender,
      person.profession,
      person.education,
    )
  }

  async findByCpf(cpf: string): Promise<Person | null> {
    const person = await this.repository.findOne({
      where: { cpf },
    })

    if (!person) {
      return null
    }

    return new Person(
      person.id,
      person.name,
      person.email,
      person.cpf,
      person.phone,
      person.address,
      person.gender,
      person.profession,
      person.education,
    )
  }

  async findByPhone(phone: string): Promise<Person | null> {
    const person = await this.repository.findOne({
      where: { phone },
    })

    if (!person) {
      return null
    }

    return new Person(
        person.id,
        person.name,
        person.email,    
        person.cpf,
        person.phone,    
        person.address,
        person.gender,    
        person.profession,
        person.education,
    )
  }
}


