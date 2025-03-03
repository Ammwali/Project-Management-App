const express = require('express');
const verifyToken = require('../middleware/middle.auth')
// const authMiddleware = require('../middleware/middle.auth')
const {loginAdmin, registerAdmin, getAllmployees, getOneEmployee, getOneEmployeeByName, updateEmployee, deleteEmployee} = require('../controllers/admin.controllers')
const router = express.Router();
router.post('/register', registerAdmin);
router.post('/login', loginAdmin)
router.get('/employees', getAllmployees)
router.get('/employee/:id', getOneEmployee)
router.get('/employee/name/:name', getOneEmployeeByName)
router.put('/employee/update/:id', updateEmployee)
router.delete('/employee/delete/:id', deleteEmployee)
router.get('/protected', verifyToken, ()=>{
    return res.status(200).json({message: 'Access Granted!'})
})


module.exports = router