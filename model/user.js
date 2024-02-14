const myDb = require('../utility/database')
const {DataTypes} = require('sequelize')

const User = myDb.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    con_password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = User;