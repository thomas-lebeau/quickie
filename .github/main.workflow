workflow "Build and Publish" {
  on = "push"
  resolves = ["Build", "Deploy"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run build"
}

action "Master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Build"]
  args = "branch master"
}

action "Deploy" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  secrets = [
    "SURGE_TOKEN",
    "SURGE_LOGIN",
  ]
  args = "run deploy"
}
