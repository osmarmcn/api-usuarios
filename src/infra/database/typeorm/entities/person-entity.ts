import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('people')
export class PersonEntity {
    @PrimaryColumn({ type: 'uuid' })
    id!: string

    @Column({type: 'varchar', length: 100})
    name!: string

    @Column({ unique: true, type: 'varchar' })
    email!: string

    @Column({ unique: true, type: 'varchar', length: 11 })
    cpf!: string

    @Column({ unique: true, type: 'varchar' })
    phone!: string

    @Column({type: 'varchar'})
    address!: string

    @Column({type: 'varchar', nullable: true})
    gender?: string

    @Column({type: 'varchar', nullable: true})
    profession?: string

    @Column({type: 'varchar', nullable: true})
    education?: string


}