export class User {
  private static contadorId = 1
  public id: number
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
  ) {
    this.id = User.contadorId++
  }

  verificarSenha(senhaDigitada: string): boolean {
    return this.senha === senhaDigitada
  }

  getDadosPublicos() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email
    }
  }
}