import express, { Express, Request, Response } from 'express'
import { join } from 'path'

import controller from "./controller"


const app: Express = express()
const PORT = 8000
const HOST = 'localhost'

app.set('views', join(__dirname, 'templates'))
app.use('/static/', express.static(join(__dirname, 'static')))
app.set("view engine", 'ejs')

app.get('/', (req:Request, res: Response) => {
    res.render('home')
})

app.get('/api/films/', controller.getAllFilms)


app.listen(PORT, HOST, ()=>{
    console.log(`http://localhost:${PORT}`)
})