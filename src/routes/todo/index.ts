import { Router } from 'express';
import { validateDto } from '../../middlewares/dto-validator.middleware.js';
import {
  getAllTodoController,
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from '../../controllers/todo/index.js';
import { CreateOrUpdateTodoDTO } from '../../dto/todo/create-or-update-todo.dto.js';
import { validateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', validateToken, getAllTodoController);
router.get('/:id', validateToken, getTodoController);
router.post(
  '/',
  validateToken,
  validateDto(CreateOrUpdateTodoDTO),
  createTodoController,
);
router.put(
  '/:id',
  validateToken,
  validateDto(CreateOrUpdateTodoDTO),
  updateTodoController,
);
router.delete('/:id', validateToken, deleteTodoController);

export default router;
