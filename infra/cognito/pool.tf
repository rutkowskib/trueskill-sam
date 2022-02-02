resource "aws_cognito_user_pool" "pool" {
  name = "no_amplify_pool"
  username_attributes = [
    "email"
  ]
}

resource "aws_cognito_user_pool_client" "client" {
  name = "no_amplify_pool_client"
  user_pool_id = aws_cognito_user_pool.pool.id

  allowed_oauth_flows = [
    "code",
    "implicit"
  ]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = [
    "phone",
    "email",
    "openid",
    "aws.cognito.signin.user.admin",
    "profile"
  ]
  callback_urls = [ "http://localhost:3000/token" ]
  logout_urls = [ "http://localhost:3000/" ]
  supported_identity_providers = [ "Facebook" ]
}

resource "aws_cognito_identity_provider" "facebook_provider" {
  user_pool_id  = aws_cognito_user_pool.pool.id
  provider_name = "Facebook"
  provider_type = "Facebook"

  provider_details = {
    authorize_scopes = "public_profile, email"
    client_id        = var.facebook_app_id
    client_secret    = var.facebook_secret
  }

  attribute_mapping = {
    email    = "email"
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = replace(lower(aws_cognito_user_pool.pool.id), "_", "-")
  user_pool_id = aws_cognito_user_pool.pool.id
}