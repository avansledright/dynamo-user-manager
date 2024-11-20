// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { verifyPassword } from '../../app/src/utils/encryption';

const client = new DynamoDB({
  region: process.env.AWS_REGION
});

const dynamoDB = DynamoDBDocument.from(client);
const TABLE_NAME = 'users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    const result = await dynamoDB.query({
      TableName: TABLE_NAME,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    });

    const user = result.Items?.[0];
    
    if (!user || !verifyPassword(user.password, password)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, user: { ...user, password: undefined } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}