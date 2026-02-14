terraform {
  required_providers {
    render = {
      source  = "render-oss/render"
      version = "~> 1.0"
    }
  }
}

resource "render_postgresql" "krishi_db" {
  name     = "krishi-prod-db"
  plan     = "standard"
  region   = "oregon"
  version  = "15"
}

resource "render_web_service" "krishi_backend" {
  name           = "krishi-api-prod"
  plan           = "standard"
  region         = "oregon"
  runtime        = "python"
  build_command  = "pip install -r requirements.txt"
  start_command  = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
  
  env_vars = {
    DATABASE_URL = render_postgresql.krishi_db.connection_string
  }
}
