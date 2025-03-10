const express = require('express');
const router = express.Router();

const { createTodo } = require('../controllers/createTodo');
const { updateTodo } = require('../controllers/updateTodo')
const { getTodo, getTodoById } = require('../controllers/getTodo');
const { deleteTodo } = require('../controllers/deleteTodo');

router.post('/create', createTodo);
router.put('/update/:id', updateTodo);
router.get('/getTodo', getTodo);
router.get('/getTodo/:id', getTodoById);
router.delete('/delete/:id', deleteTodo);

module.exports = router;     