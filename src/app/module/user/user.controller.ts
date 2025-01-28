import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { UserServices } from './user.service';

// const createUser = catchAsync(async (req, res) => {
//   const { password, user: userData } = req.body;
//   //console.log(userData);
//   const result = await UserServices.createUserIntoDB(password, userData);
//   //console.log(result);
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: `res create successfully`,
//     data: result,
//   });
// });

const getAllUsers = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserController = {
  //createUser,
  getAllUsers,
};
