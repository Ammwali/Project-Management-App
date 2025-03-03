const express = require("express")
const router = express.Router();
const { getProject, addProject, updateProject, deleteProject, getProjectById } = require("../controllers/projects.controllers")


// router.get('/', (req, res) => {
//     res.send('Project routes');
// });

router.get('/allProjects', getProject);
router.post('/create', addProject);
router.get('/project/:id', getProjectById);
router.put('/update/:id', updateProject);
router.delete('/delete/:id', deleteProject);
module.exports = router;