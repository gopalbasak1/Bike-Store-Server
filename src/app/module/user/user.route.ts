import express from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// router.post(
//   '/create-user',
//   validationRequest(UserValidation.createUser),
//   UserController.createUser,
// );
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

export const UserRoute = router;
