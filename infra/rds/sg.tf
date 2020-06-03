resource "aws_default_vpc" "default_vpc" {
}

resource "aws_security_group" "rds_sg" {
  name        = "RDS-sg"
  vpc_id      = aws_default_vpc.default_vpc.id

  ingress {
    description = "PG from anywhere"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}