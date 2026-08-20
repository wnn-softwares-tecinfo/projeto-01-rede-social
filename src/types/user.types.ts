// Types - Tipagem TypeScript
// Define interfaces, tipos e DTOs para garantir type-safety

export interface User {
  id: number
  nome: string
  email: string
  senha: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserPublic {
  id: number
  nome: string
  email: string
  createdAt?: Date
}

export interface CreateUserDTO {
  nome: string
  email: string
  senha: string
}

export interface UpdateUserDTO {
  nome?: string
  email?: string
  senha?: string
}

