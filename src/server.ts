import express, { Express, Request, Response } from 'express'
import { join } from 'path'

import cors from "cors"

import filmsRouter from './filmsApp/filmsRouter'
import genresRouter from './genresApp/genresRouter'
import actorsRouter from './actorsApp/actorsRouter'
import directorsRouter from './directorsApp/directorsRouter'
import adminRouter from './adminApp/adminRouter'
import reviewRouter from './reviewApp/reviewRouter'
import usersRouter from './userApp/userRouter'



const app: Express = express()
const PORT = 3001
const HOST = 'localhost'


app.use(cors({
    origin: ['http://localhost:3000']
}))

app.set('views', join(__dirname, 'templates'))
app.use('/static/', express.static(join(__dirname, 'static')))
app.use(express.json())

app.use('/api/film/', filmsRouter)
app.use('/api/genre/', genresRouter)
app.use('/api/actor/', actorsRouter)
app.use('/api/director/', directorsRouter)
app.use('/api/admin/', adminRouter)
app.use('/api/review/', reviewRouter)
app.use('/api/user/', usersRouter)




app.listen(PORT, HOST, ()=>{
    console.log(`http://${HOST}:${PORT}`)
})