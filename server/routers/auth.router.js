import express from 'express';
const Router = express.Router();
import { signup, login,logout } from '../controllers/auth.controller.js';
Router.post('/signup', signup);
Router.post('/login', login);
Router.get('/logout', logout);
export default Router;