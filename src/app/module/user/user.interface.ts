/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  name: TUserName;
  role: 'admin' | 'customer';
  email: string;
  image?: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isActive: boolean;
  isDeleted: boolean;
  fullName?: string;
};
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // Method for checking if a user exists by their MongoDB ObjectId
  //isUserExistsById(id: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
