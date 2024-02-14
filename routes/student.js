const express =  require('express');

const router = express.Router();
const studentController = require('../controller/studentController')


router.get("/student",studentController.getStudents);

router.get("/student/create",studentController.createStudent);

router.post("/create",studentController.postStudent);

router.get('/edit/:id',studentController.editStudent);

router.post('/update/:id',studentController.updateStudent)

router.get('/delete/:id',studentController.deleteStudent)

module.exports = router;