output "rds_username" {
  value = aws_db_instance.rds.username
}
output "rds_password" {
  value = aws_db_instance.rds.password
}
output "rds_database" {
  value = aws_db_instance.rds.name
}
output "rds_hostname" {
  value = aws_db_instance.rds.endpoint
}

