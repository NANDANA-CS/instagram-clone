
import express from "express"

import { signUp,logIn , getUser, editUser } from "../controller/user_controller.js"

import { addPost,deleteProfile,getPost,loadPosts } from "../controller/post_controller.js"

import auth from "../middleware/auth.js"

const insta_routes = express.Router()
insta_routes.post("/signUp",signUp)
insta_routes.post("/logIn",logIn)

insta_routes.post("/addPost",addPost)
insta_routes.get("/loadPosts",auth,loadPosts)

insta_routes.get("/getUser/:id",getUser)
insta_routes.post("/editUser/:id",editUser)
insta_routes.get("/getPost/:id",getPost)
insta_routes.get('/deleteProfile/:id',deleteProfile)


export default insta_routes
