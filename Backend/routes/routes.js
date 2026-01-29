import express from"express"
export const route =express.Router()
import {create,checking,getUser} from "./../controller/userController.js"
route.get("/healthz",checking)
route.post("/pastes",create)
route.get("/pastes/:id",getUser)