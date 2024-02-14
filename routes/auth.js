const express = require('express')
const User = require('../model/user')
const { getIndex, getCreate, postUser, editUser, updateUser, deleteUser, getLogin, postLogin, postLogout } = require('../controller/authController')
const {body,check,validationResult}= require('express-validator')

const router = express.Router();

router.get('/user',getIndex)

router.get('/user/create',getCreate)

router.get('/user/login',getLogin)

router.post('/user/login',postLogin)

router.post('/user/logout',postLogout)

router.post('/user/create',
[

body('email')
.isEmail()
.custom(async value => {
  const existingUser = await User.findOne({where:{email:value}});
  if (existingUser) {
    throw new Error('A user already exists with this e-mail address');
  }
}),
body('fname').isLength({max:30,min:3}).withMessage('at least enter 3 character of your Name'),

],postUser)

router.get('/user/edit/:id',editUser)

router.post('/user/update/:id',updateUser)

router.get('/user/delete/:id',deleteUser)

module.exports = router;