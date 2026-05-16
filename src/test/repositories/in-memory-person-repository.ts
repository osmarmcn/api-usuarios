
import { Person } from '@/domain/entities/person'
import { IPersonRepository } from '@/domain/repositories/person-repository'

export class InMemoryPersonRepository implements IPersonRepository{
  private people: Person[] = []

  async create(person: Person): Promise<Person> {

    this.people.push(person)
    return person
  }

  async findByEmail(email: string,): Promise<Person | null> {

    const person = this.people.find(person => person.email === email)
    return person ?? null
  }

  async findByCpf(cpf: string,): Promise<Person | null> {

    const person = this.people.find(person => person.cpf === cpf)

    return person ?? null
  }

  async findByPhone(phone: string,): Promise<Person | null> {

    const person = this.people.find(person => person.phone === phone)
    return person ?? null
  }

  async findAll(): Promise<Person[]> {
    return this.people
  }

  async save(person: Person): Promise<Person> {
  const index = this.people.findIndex(item => item.id === person.id)

  this.people[index] = person

  return person
}

  async findById(id: string): Promise<Person | null> {

    const person = this.people.find(person => person.id === id)
    return person ?? null
  }

  async update(person: Person): Promise<Person> {

    const index = this.people.findIndex(item => item.id === person.id)

    this.people[index] = person

    return person
  }

  async delete(id: string): Promise<void> {
    this.people = this.people.filter(
      person => person.id !== id,
    )
  }
}