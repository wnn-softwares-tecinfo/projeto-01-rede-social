import type { Request, Response } from 'express'
import { Router } from 'express'
import { User } from '../models/user'

const usersRoutes = Router()

const users: User[] = []
const user = new User('winnicius', 'winni@gmail.com', '123')
const user1 = new User('João Silva', 'joao@email.com', '123456')
const user2 = new User('Maria Santos', 'maria@email.com', 'senha123')

users.push(user, user1, user2)

usersRoutes.get('/users', (request: Request, response: Response) => {

  return response.status(200).json({
    message: `Lista de usuários`,
    timestamp: new Date().toISOString(),
    data: users,
  })
})


usersRoutes.get('/users/:id', (request: Request, response: Response) => {

  const { id } = request.params

  //todo-winnicius: transferir para o service de consulta do banco de dados
  const user = users.find(user => user.id === Number(id))
  console.log(id)

  if (!user) {
    return response.status(404).json({
      message: 'Usuário não encontrado',
      timestamp: new Date().toISOString(),
      status: 'API funcionando!'
    })
  }


  response.status(200).json({
    message: 'Detalhes do usuário:',
    parametro: id,
    timestamp: new Date().toISOString(),
    user: user.getDadosPublicos(),
    status: 'API funcionando!'
  })
})

usersRoutes.post('/users', (request: Request<User>, response: Response) => {

  const { nome, email, senha } = request.body as User

  const user = new User(nome, email, senha)
  users.push(user)

  return response.status(201).json({
    message: 'Usuário criado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user.getDadosPublicos(),
  })
})

usersRoutes.put('/users/:id', (request: Request, response: Response) => {

  const { id } = request.params
  const { nome, email, senha } = request.body as User

  const userIndex = users.findIndex(user => user.id === Number(id))
  if (userIndex === -1) {
    return response.status(404).json({
      message: 'Usuário não encontrado',
      timestamp: new Date().toISOString(),
      status: 'API funcionando!'
    })
  }

  const user = users[userIndex]
  user.nome = nome || user.nome
  user.email = email || user.email
  user.senha = senha || user.senha

  return response.status(200).json({
    message: 'Usuário atualizado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user.getDadosPublicos(),
  })
})


export default usersRoutes


