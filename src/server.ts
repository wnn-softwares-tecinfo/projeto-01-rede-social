import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import { User } from './models/user'


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const users: User[] = []
const user = new User('winnicius', 'winni@gmail.com', '123')
const user1 = new User('João Silva', 'joao@email.com', '123456')
const user2 = new User('Maria Santos', 'maria@email.com', 'senha123')

users.push(user,user1, user2)

app.get('/', (request: Request, response: Response) => {

  response.json({
    message: 'Bem-vindo à API de Usuários!',
    timestamp: new Date().toISOString(),
    status: 'API funcionando!'
  })
})

app.get('/users', (request: Request, response: Response) => {
  
  const dadosPublicos = users.map(user => new User(user.nome, user.email).getDadosPublicos())

  response.json({
    message: `Lista de usuários (${dadosPublicos.length}):`,
    timestamp: new Date().toISOString(),
    users: dadosPublicos,
    status: 'API funcionando!'
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
  console.log(`Health: http://localhost:${port}/health`)
})
