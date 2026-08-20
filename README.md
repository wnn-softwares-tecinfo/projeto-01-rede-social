# Configuração do Prisma

## Instalação

```bash
npm install @prisma/client
npm install prisma -D
```

## Configurar o Banco de Dados

Criar arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:@localhost:3306/myapp"
```

## Comandos Principais

### Gerar o Prisma Client
```bash
npx prisma generate
```

### Criar migração
```bash
npx prisma migrate dev --name nome_da_migracao
```

### Aplicar migrações (produção)
```bash
npx prisma migrate deploy
```

### Ver status das migrações
```bash
npx prisma migrate status
```

### Abrir Prisma Studio (interface visual)
```bash
npx prisma studio
```

### Resetar banco de dados (CUIDADO: apaga tudo)
```bash
npx prisma migrate reset
```

## Usar no código

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Exemplo: buscar todos os usuários
const users = await prisma.user.findMany()
```
