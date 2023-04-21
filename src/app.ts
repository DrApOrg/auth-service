import express, { Application } from "express";
import Server from './server'

const app: Application = express()

const server = new Server(app)

server.init()
