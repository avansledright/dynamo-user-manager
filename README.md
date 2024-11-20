# DynamoDB User Management System

A TypeScript-based web application for user authentication using AWS DynamoDB, Next.js, and Docker.

## Features
- User registration and login
- Secure password encryption
- DynamoDB integration for user storage
- Protected dashboard route
- AWS infrastructure managed with Terraform

## Tech Stack
- TypeScript/Next.js
- AWS DynamoDB
- Docker
- Terraform
- Tailwind CSS

## Project Structure
```
.
├── app
│   └── src
│       ├── api
│       │   ├── signup.ts
│       │   └── users.ts
│       ├── pages
│       │   ├── index.tsx
│       │   ├── login.tsx
│       │   ├── signup.tsx
│       │   └── dashboard.tsx
│       ├── types
│       │   └── user.ts
│       └── utils
│           └── encryption.ts
├── terraform
│   ├── dynamodb.tf
│   └── main.tf
├── Dockerfile
├── next.config.js
├── package.json
└── tsconfig.json
```

## Setup

1. Configure AWS Credentials:
```bash
aws configure
```

2. Deploy Infrastructure:
```bash
cd terraform
terraform init
terraform apply
```

3. Build and Run Application:
```bash
docker build -t user-auth-demo .
docker run -p 3000:3000 -v ~/.aws:/root/.aws user-auth-demo
```

## API Endpoints

### POST /api/signup
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/login
```json
{
  "email": "string",
  "password": "string"
}
```

## Infrastructure

The DynamoDB table includes:
- Primary key: id (string)
- Global Secondary Index: email
- On-demand capacity mode
- Basic encryption at rest

## Security Features
- Password encryption using PBKDF2
- AWS credentials management via mounted config
- Session-based authentication
- Protected dashboard route

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

## Production
Build optimized container:
```bash
docker build -t user-auth-demo:prod --target production .
```

## Environment Variables
- AWS_REGION
- AWS_SDK_LOAD_CONFIG
- DYNAMODB_TABLE_NAME

## Notes
- Ensure AWS credentials are properly configured
- The application uses AWS SDK v3
- Tailwind is configured for styling