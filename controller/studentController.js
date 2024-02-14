const Student = require('../model/student')
exports.getStudents =(req,res)=>{
    Student.findAll().then((students)=>{
        res.render('student/home',{student:students,isAuthenticated:req.session.isLoggedIn,us:req.session.user})
    }).catch((err)=>console.log(err))
}

exports.createStudent = (req,res)=>{
    res.render('student/create',{isAuthenticated:req.session.isLoggedIn,us:req.session.user})
    
}

exports.postStudent = (req,res)=>{
    const {fName,lName,phone} = req.body
    const image = req.file 
    console.log(image)
    if(!image){
        res.render('student/create',{isAuthenticated:req.session.isLoggedIn,us:req.session.user,err:'wrong'})
    }else{
        const imageUrl = image.path;
        Student.create({firstName:fName,lastName:lName,phone:phone,image:imageUrl}).then(()=>{
            res.redirect('/student')
        }).catch((err)=>console.log(err));
    }
    // const student = new Student(null,fName,lName,phone)
    // student.save().then(()=>{
    //     res.redirect('/')
    // }).catch(err=>console.log(err))
}

exports.editStudent = async (req,res)=>{
    const studentId = req.params.id
    console.log(studentId)
    const student = await Student.findOne({ where: { id: studentId } })
    console.log(student.dataValues)
    res.render('student/edit',{Stu:student.dataValues,isAuthenticated:req.session.isLoggedIn,us:req.session.user})
}

exports.updateStudent =async (req,res)=>{

    const {fName,lName,phone} = req.body
    const id = req.params.id
    const student = await Student.findOne({where:{id:id}})
    // await Student.update({
    //     fName:fName,
    //     lName:lName,
    //     phone:phone
    // },{where:{
    //     id:id
    // }}).then(()=>{res.redirect('/')}).catch((err)=>{console.log(err)})

    await Student.update({
        firstName:fName || student.dataValues.firstName,
        lastName:lName || student.dataValues.lastName,
        phone:phone || student.dataValues.phone
    },{where:{
        id:id
    }})

    res.redirect('/student')
}

exports.deleteStudent = async (req,res)=>{
    const id = req.params.id
    console.log(id)

    await Student.destroy({where:{id:id}})

    res.redirect('/student')
}