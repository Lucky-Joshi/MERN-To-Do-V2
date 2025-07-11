import express from 'express';
import {
  getTasks, createTask, toggleComplete, softDelete,
  restoreTask, deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/:userId', getTasks);
router.post('/', createTask);
router.put('/toggle/:id', toggleComplete);
router.put('/trash/:id', softDelete);
router.put('/restore/:id', restoreTask);
router.delete('/:id', deleteTask);

export default router;
