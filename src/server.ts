import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import userRoutes from './routes/user.routes'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
  response.json({
    message: 'API funcionando!',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/v1', [userRoutes])

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
  console.log(`Health: http://localhost:${port}/health`)
})