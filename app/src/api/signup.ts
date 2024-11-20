// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword } from '../../app/src/utils/encryption';
import { User } from '../../app/src/types/user';

const client = new DynamoDB({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const dynamoDB = DynamoDBDocument.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name, password } = req.body;
    
    const user: User = {
      id: uuidv4(),
      email,
      name,
      password: encryptPassword(password),
      createdAt: new Date().toISOString()
    };

    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: user
    });

    res.status(200).json({ success: true, user: { ...user, password: undefined } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}