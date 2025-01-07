import express, { Express, Request, Response } from 'express'
import { join } from 'path'

import cors from "cors"

import filmsRouter from './filmsApp/filmsRouter'
import genresRouter from './genresApp/genresRouter'


const app: Express = express()
const PORT = 3001
const HOST = 'localhost'


app.set('views', join(__dirname, 'templates'))
app.use('/static/', express.static(join(__dirname, 'static')))
app.use(cors())
// app.set("view engine", 'ejs')

app.use('/film/', filmsRouter)
app.use('/genre/', genresRouter)

// app.get('/', (req:Request, res: Response) => {
//     res.render('home')
// })



app.listen(PORT, HOST, ()=>{
    console.log(`http://localhost:${PORT}`)
})