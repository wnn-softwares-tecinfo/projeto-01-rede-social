import type { Request, Response } from 'express'
import { UserService } from '../services/user.service'

// Controller - Camada de apresentação
// Responsável por lidar com requisições HTTP e respostas
// Delega a lógica de negócios para o Service
export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async criarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body)

      return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        timestamp: new Date().toISOString(),
        user,
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'E-mail já cadastrado') {
          return res.status(400).json({
            erro: error.message
          })
        }
      }

      return res.status(500).json({
        erro: 'Erro ao criar usuário',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  async listarUsuarios(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers()

      return res.status(200).json({
        message: 'Lista de usuários',
        data: users,
      })
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro ao listar usuários',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  async buscarUsuarioPorId(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.query.id)
      const user = await this.userService.getUserById(id)

      return res.status(200).json({
        message: 'Detalhes do usuário',
        user,
        status: 'API funcionando!'
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Usuário não encontrado') {
          return res.status(404).json({
            erro: error.message
          })
        }
      }

      return res.status(500).json({
        erro: 'Erro ao buscar usuário',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  async atualizarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.params.id)
      const user = await this.userService.updateUser(id, req.body)

      return res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        timestamp: new Date().toISOString(),
        user,
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Usuário não encontrado') {
          return res.status(404).json({
            erro: error.message
          })
        }
        if (error.message === 'E-mail já está sendo usado por outro usuário') {
          return res.status(400).json({
            erro: error.message
          })
        }
      }

      return res.status(500).json({
        erro: 'Erro ao atualizar usuário',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  async deletarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.params.id)
      await this.userService.deleteUser(id)

      return res.status(200).json({
        message: 'Usuário deletado com sucesso!',
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Usuário não encontrado') {
          return res.status(404).json({
            erro: error.message
          })
        }
      }

      return res.status(500).json({
        erro: 'Erro ao deletar usuário',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }
}
