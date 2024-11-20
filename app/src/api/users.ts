// app/src/api/users.ts
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword, verifyPassword } from '../utils/encryption';
import { User } from '../types/user';

const client = new DynamoDB({});
const dynamoDB = DynamoDBDocument.from(client);
const TABLE_NAME = process.env.USERS_TABLE_NAME || 'users';

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
  const user: User = {
    id: uuidv4(),
    ...userData,
    password: encryptPassword(userData.password),
    createdAt: new Date().toISOString()
  };

  await dynamoDB.put({
    TableName: TABLE_NAME,
    Item: user
  });

  return user;
};