import { User } from './user.model';

// const createUserIntoDB = async (password: string, payload: TUser) => {
//   const existing = await User.findOne({ email: payload?.email });

//   if (existing) {
//     throw new AppError(httpStatus.CONFLICT, 'User already exists');
//   }

//   const userData: Partial<TUser> = { ...payload };
//   userData.password = password || (config.default_password as string);

//   const result = await User.create(userData);
//   console.log(result);
//   return result;
// };

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  // createUserIntoDB,
  getAllUsersFromDB,
};
