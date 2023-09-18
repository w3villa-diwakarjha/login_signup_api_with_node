const express= require('express');
const router= express.Router();
const {studentloginController,studentsignupController}= require('../src/user/controller/studentController');

router.post('/signup', studentsignupController);
router.post('/login', studentloginController);

module.exports=router;
