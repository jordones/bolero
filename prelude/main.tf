terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "server" {
  name = "server"
  build {
    path = "."
    label = {
      author : "jordo"
    }
  }
  keep_locally = false
}

resource "docker_container" "server" {
  image = docker_image.server.latest
  name  = "base_node_app"
  ports {
    internal = 3000
    external = 8000
  }
}
