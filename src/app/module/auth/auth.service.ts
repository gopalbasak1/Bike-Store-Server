import AppError from '../../errors/AppErrors';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const registerFromDB = async (password: string, payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const login = async (payload: TLoginUser) => {
  // Validate the existence of the JWT secret
  if (!config.jwt_access_secret) {
    throw new Error('JWT secret is not defined in the configuration.');
  }

  // Is User exists checking
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  //console.log(user);
  if (!user)
    throw new AppError(httpStatus.NOT_FOUND, 'This user email is not found !');

  if (user?.isDeleted === false)
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted !');

  // Is User block checking
  const isUserStatus = user?.status;
  //console.log(isUserBlocked);
  if (isUserStatus === 'blocked')
    throw new AppError(httpStatus.FORBIDDEN, 'This user is block !');

  //checking if the password is correct
  const isMatch = await bcrypt.compare(payload?.password, user?.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload | undefined, // Accept undefined
  payload: { oldPassword: string; newPassword: string },
) => {
  if (!userData) {
    throw new AppError(401, 'User is not authenticated.');
  }

  const user = await User.findOne({ email: userData.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  if (user.isDeleted === false) {
    throw new AppError(403, 'This user is deleted.');
  }

  if (user.status === 'blocked') {
    throw new AppError(403, 'This user is blocked.');
  }

  // Debugging output
  // console.log('Old Password:', payload.oldPassword);
  // console.log('Stored Password:', user.password);

  if (!user.password) {
    throw new AppError(500, 'Password not found for user.');
  }

  const isMatch = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, 'Old password is incorrect.');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  //checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted === false) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerFromDB,
  login,
  changePassword,
  refreshToken,
};
