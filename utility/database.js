const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Db_stu1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})


module.exports = sequelize;

