


export class Person {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public readonly cpf: string,
        public phone: string,
        public address: string,
        public gender?: string,
        public profession?: string,
        public education?: string,

        

    ){}

    
}