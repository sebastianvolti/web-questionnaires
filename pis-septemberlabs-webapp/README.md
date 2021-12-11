# December Labs - PIS 2020
December Labs PIS 2020 project, Frontend for the end user in React with TypeScript.

## Installation
* Clone this repository locally
* Execute the command **yarn install**

## Scripts
* **yarn start**: Starts the project
* **yarn build**: Creates a production build
* **yarn test**: Searches for every test file and executes them
* **yarn eslint**: Executes the linter

## Branching Flow
We are using git-flow.
* Production branch is **master**
* Development branch is **develop**

### Create a new feature
* Go the **develop** branch pull the latest data from bitbucket.
* Use the command **git flow feature start <branch name>**

### Create a new bug
* Go the **develop** branch pull the latest data from bitbucket.
* Use the command **git flow bugfix start <branch name>**

### Expected Flow
* Features/Bugs get created from base branch **develop**
* When branch is ready, PR is created to branch **develop**, and merged after it was approved
* Branch develop will be used for testing.
* When we want to update the production branch, a PR from **develop** will be created to the branch **master**

## Main Libraries which are included
* redux
* redux-saga
* eslint
* axios
* react-router-dom

# Docker Setup
## Define `$PARENT_PWD` env var

This can be hardcoded with the root dev folder.

UNIX users can add this to .bash_profile

    export PARENT_PWD="$(dirname "$(pwd)")"

## Copy `.env.example` and rename to `.env`

Add corresponding config values

## Copy `docker-compose.example.yml` and rename to `docker-compose.yml`

# Running
To run the project simply run

    docker-compose up

This will spin up the `webapp` instance.
To spin up the instance with a new build add the `--build` flag as so

    docker-compose up --build

Go to `http://localhost:5002/` and you should see the project up and running
