
import express from "express"

import { signUp,logIn , getUser, editUser, sendOTP, verify_otp, pass_reset, delete_otp } from "../controller/user_controller.js"

import { addPost,deleteProfile,getPost,likePost,loadPosts } from "../controller/post_controller.js"

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
insta_routes.post('/sendotp',sendOTP)


insta_routes.post("/verify_otp",verify_otp)

insta_routes.post('/pass_reset',pass_reset)

insta_routes.post('/delete_otp',delete_otp)

insta_routes.post('/likePost',likePost)

export default insta_routes
