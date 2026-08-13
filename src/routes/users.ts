import type { Request, Response } from 'express'
import { Router } from 'express'
import { User } from '../models/user'

const usersRoutes = Router()

const users: User[] = []
const user = new User('winnicius', 'winni@gmail.com', '123')
const user1 = new User('João Silva', 'joao@email.com', '123456')
const user2 = new User('Maria Santos', 'maria@email.com', 'senha123')

users.push(user, user1, user2)

usersRoutes.get('/users', (_request: Request, response: Response) => {

  return response.json({
    message: `Lista de usuários`,
    timestamp: new Date().toISOString(),
    data: users,
  })
})


export default usersRoutes


