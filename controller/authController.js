const User = require('../model/user')
const bcrypt = require('bcrypt')
const {body,check,validationResult}= require('express-validator')

exports.getIndex = async (req,res)=>{
    await User.findAll().then (async (users)=>{
        res.render('auth/index',{user:users,isAuthenticated:req.session.isLoggedIn,us:req.session.user})
    }).catch((err)=>console.log(err))

}

exports.getCreate = (req,res)=>{
    res.render('auth/create',{isAuthenticated:req.session.isLoggedIn,us:req.session.user})
}

exports.postUser = (req,res)=>{
    const {fname,email,password,con_password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let errr = errors.errors[0].msg
        console.log(errors.errors[0].msg)
        res.render('auth/create',{err1:errr})
    }else{
        if(password === con_password){
            bcrypt.hash(password,10).then((hash)=>{
                User.create({
                    fullName:fname,
                    email:email,
                    password:hash,
                    con_password:hash
                }).then(()=>{
                    res.redirect('/user')
                }).catch((err)=>console.log(err))
            })
            
        }else{
            res.render('auth/create',{err:"Hello",isAuthenticated:req.session.isLoggedIn,us:req.session.user})
        }
    }
    
}

exports.editUser = async (req,res)=>{
    const userId = req.params.id
    const user = await User.findOne({ where: { id: userId } })
    res.render('auth/edit',{us:user.dataValues,isAuthenticated:req.session.isLoggedIn,us:req.session.user})
}

exports.updateUser = async (req,res)=>{
    const {fName,email,password} = req.body;
    const id = req.params.id

    bcrypt.hash(password,10).then((hash)=>{
        User.update({
            fullName:fName ,
            email:email,
            password:hash 
        },{where:{
            id:id
        }}).then(()=>{res.redirect('/user')}).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err))
    
}
exports.deleteUser = async (req,res)=>{
    const id  = req.params.id
    await User.destroy({where:{
        id:id
    }})

    res.redirect('/user')
}

exports.getLogin =(req,res)=>{
    // const isLoggedIn = (req.get('Cookie').split(';')[0].trim().split('=')[1])
    console.log(req.session.isLoggedIn)
    console.log(req.session.user)
    res.render('auth/login',{isAuthenticated:req.session.isLoggedIn,us:req.session.user})
}

exports.postLogin = (req,res)=>{
    const {email,password} = req.body;
    User.findOne({where:{email:email}}).then( async (user)=>{
        const pass = await bcrypt.compare(password,user.password)
        console.log(pass)
        if(pass == true){
            req.session.isLoggedIn = true
            req.session.user = user
            res.redirect('/')
        }else{
            res.render('auth/login',{errors:"Password is incorrect",isAuthenticated:req.session.isLoggedIn})
        }
    }).catch((err)=>{
        console.log(err)
        res.render('auth/login',{errors:"Email and password is incorrect",isAuthenticated:req.session.isLoggedIn})
    })
}

exports.postLogout = (req,res)=>{
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/user/login')
    })
}