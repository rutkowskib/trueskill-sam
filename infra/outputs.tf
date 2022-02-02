output "rds_username" {
  value = module.rds.rds_username
  sensitive = true
}
output "rds_password" {
  value = module.rds.rds_password
  sensitive = true
}
output "rds_database" {
  value = module.rds.rds_database
  sensitive = true
}
output "rds_hostname" {
  value = module.rds.rds_hostname
  sensitive = true
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