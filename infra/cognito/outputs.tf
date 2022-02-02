output "client_id" {
  value = aws_cognito_user_pool_client.client.id
}

output "user_pool_id" {
  value = aws_cognito_user_pool.pool.id
}

output "identity_pool_id" {
  value = aws_cognito_identity_pool.main.id
}

output "cognito_domain" {
  value = aws_cognito_user_pool_domain.main.domain
}