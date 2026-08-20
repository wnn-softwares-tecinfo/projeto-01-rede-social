import type { Request, Response } from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { User } from '../models/user'

const prisma = new PrismaClient()

const usersRoutes = Router()

usersRoutes.get('/users', async (request: Request, response: Response) => {
  const result = await prisma.user.findMany()

  return response.status(200).json({
    message: `Lista de usuários`,
    data: result,
  })
})


usersRoutes.get('/users/:id', async (request: Request, response: Response) => {

  const { id, } = request.params

  //todo-winnicius: transferir para o service de consulta do banco de dados
  const result = await prisma.user.findUnique({
    where: {
      id: Number(id),
    }
  })


  if (!result) {
    return response.status(404).json({
      message: 'Usuário não encontrado',
      timestamp: new Date().toISOString(),
      status: 'API funcionando!'
    })
  }


  response.status(200).json({
    message: 'Detalhes do usuário:',
    user: result,
    status: 'API funcionando!'
  })
})

usersRoutes.post('/users', async (request: Request<User>, response: Response) => {
  const { nome, email, senha } = request.body as User
  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha,
    },
  })

  return response.status(201).json({
    message: 'Usuário criado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user,
  })
})


usersRoutes.put('/users/:id', async (request: Request<User>, response: Response) => {
  const { id } = request.params
  const { nome, email, senha } = request.body as User
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      email,
      senha,
    },
  })

  return response.status(200).json({
    message: 'Usuário atualizado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user,
  })
})

usersRoutes.delete('/users/:id', async (request: Request, response: Response) => {
  const { id } = request.params
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })

  return response.status(200).json({
    message: 'Usuário deletado com sucesso!',
    timestamp: new Date().toISOString(),
  })
})

export default usersRoutes


