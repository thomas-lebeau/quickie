workflow "Build and Publish" {
  on = "push"
  resolves = [
    "Build",
    "Deploy",
    "Lint",
  ]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Lint" {
  uses = "actions/npm@master"
  args = "test"
}

action "Master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Build", "Lint"]
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

action "Build" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run build"
}
