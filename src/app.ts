import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {videoRouter} from "./routes/videoController";



export const app = express()
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
app.use(SETTINGS.PATH.VIDEOS, videoRouter)
