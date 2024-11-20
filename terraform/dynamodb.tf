resource "aws_dynamodb_table" "users" {
  name           = "users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "EmailIndex"
    hash_key        = "email"
    projection_type = "ALL"
  }

  tags = {
    Environment = "dev"
    Application = "user-auth-demo"
  }
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.users.name
}

output "dynamodb_table_arn" {
  value = aws_dynamodb_table.users.arn
}