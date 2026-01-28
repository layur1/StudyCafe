terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1"
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_instance" "studycafe_ec2" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  # 🔑 THIS IS WHAT YOU MISSED BEFORE
  key_name = "studycafe-key"

  tags = {
    Name = "StudyCafe-Terraform-EC2"
  }
}
