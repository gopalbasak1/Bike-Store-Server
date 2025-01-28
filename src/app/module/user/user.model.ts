/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const nameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: nameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  const { firstName, middleName, lastName } = this?.name || {};
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it is modified or new
  if (!user.isModified('password')) {
    return next();
  }

  if (!user.password) {
    throw new Error('Password is required');
  }

  // Hash the password
  const saltRounds = Number(config.bcrypt_salt_rounds) || 12; // Default to 12 if not configured
  user.password = await bcrypt.hash(user.password, saltRounds);

  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

//set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
