// app/src/encryption.ts
import * as crypto from 'crypto';

export const encryptPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (storedPassword: string, inputPassword: string): boolean => {
  const [salt, hash] = storedPassword.split(':');
  const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512').toString('hex');
  return hash === inputHash;
};