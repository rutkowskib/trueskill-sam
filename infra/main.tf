terraform {
  /*
  backend "s3" {
    bucket = ""
    key    = "backend-state.tfstate"
    region = "eu-west-1"
  }
  */

  required_providers {
    aws = "2.57.0"
  }
}

module "rds" {
  source = "./rds"
}

module "website_bucket" {
  source = "./s3-website"
  bucket_name = "sam-ranks"
}