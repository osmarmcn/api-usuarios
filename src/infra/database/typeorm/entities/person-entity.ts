import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('people')
export class PersonEntity {
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column({ unique: true })
    cpf!: string

    @Column({ unique: true })
    phone!: string

    @Column()
    address!: string

    @Column()
    gender?: string

    @Column()
    profession?: string

    @Column()
    education?: string


}