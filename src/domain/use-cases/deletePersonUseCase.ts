import { AppError } from "@/core/errors/app-error";
import { IPersonRepository } from "../repositories/person-repository";

interface DeletePersonRequest {
    id: string
}
export class DeletePersonUseCase {
    constructor(
        private personRepository: IPersonRepository,
    ){}

    async execute({ id }: DeletePersonRequest): Promise<void> {
        const person = await this.personRepository.findById(id)

        if (!person) {
            throw new AppError('Person not found', 404)
        }

        await this.personRepository.delete(id)
    }

}