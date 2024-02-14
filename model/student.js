const myDb = require('../utility/database')
const {DataTypes} = require('sequelize')
// module.exports = class Student{
//     constructor(id,firstName,lastName,phone){
//         this.id = id,
//         this.firstName = firstName,
//         this.lastName = lastName,
//         this.phone = phone
//     }
//     save(){
//         return myDb.execute(
//             "INSERT INTO tblStudent(firstName,lastName,phone) values(?,?,?)",[this.firstName,this.lastName,this.phone]
//         )
//     }

//     static fetchData(){
//         return myDb.execute("SELECT * FROM tblStudent")
//     }
// }
const Student = myDb.define('student',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports = Student;
