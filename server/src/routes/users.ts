import express = require('express');
import {handlers} from '../controllers/users'
var router= express.Router();

export default function userRouterFactory(users:handlers){
    
    /** GET USER LISTING */
    router.get('/profile',users.getProfile)
    
    /**POST USER LISTING */
    router.post('/accountCreate',users.accountCreate)
    router.post('/login',users.login)
    router.post('/logout',users.logout)
    
    /**PUT USER LISTING */
    router.put('/accountEdit',users.accountEdit)
    return router
}

userRouterFactory.__inject=["users"]
