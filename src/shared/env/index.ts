import 'dotenv/config'


export const env = {
    PORT: Number(process.env) || 3333,
    DATABASE_URL: process.env.DATABASE_URL ?? '',
}