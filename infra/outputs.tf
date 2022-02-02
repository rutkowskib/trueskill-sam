output "rds_username" {
  value = module.rds.rds_username
}
output "rds_password" {
  value = module.rds.rds_password
}
output "rds_database" {
  value = module.rds.rds_database
}
output "rds_hostname" {
  value = module.rds.rds_hostname
}

output "client_id" {
  value = module.cognito.client_id
}

output "user_pool_id" {
  value = module.cognito.user_pool_id
}

output "identity_pool_id" {
  value = module.cognito.identity_pool_id
}

output "cognito_domain" {
  value = module.cognito.cognito_domain
}