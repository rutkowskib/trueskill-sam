resource "random_string" "rds-password" {
  length = 16
  special = true
  override_special = "!#%&-_"
}

resource "aws_db_instance" "rds" {
  allocated_storage    = 5
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "12.2"
  instance_class       = "db.t2.micro"
  name                 = "sam_ranks"
  username             = "root"
  password             = random_string.rds-password.result
  parameter_group_name = "default.postgres12"
  publicly_accessible = true
  skip_final_snapshot = true // DO NOT USE ON PROD!!!!
  vpc_security_group_ids = [ aws_security_group.rds_sg.id ]
}