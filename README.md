
# New Vision Voting App API

Node api with express mysql sequelise

## Usage

To get started with this api follow the steps below

```shell
$ git clone https://github.com/Livingston-k/vision-Voting-app-api
$ cd vision-Voting-app-api
$ yarn install
```

## DATABASE SETUP

* Note that is project is using mysql database.
  * [ ] create a database in mysql or postgress forexample vision_voting_app
  * [ ] In the project directory  go to config/config.json and edit the database configurations to match  your setup
  * [ ] To migrate the database tables run :
    ```
    npx sequelize-cli db:migrate
    ```

## START THE SERVER

```shell
$ yarn start
```

## ENVIRONMENT VARIABLES

* In the project main directory ceate a file name **.env** and put the following

```shell
PORT=3001
LOAD_BALANCER_PORT=5000
NODE_ENV="development"
JWT_SECRET=
```

## API DOCUMENTATION

[Vision Voting app api documentation](https://documenter.getpostman.com/view/15074319/2s93JzLLN)

## Follow Me

* [Twitter](https://twitter.com/kadduLivingston)
* [Facebook](https://www.facebook.com/kadduLivingstoneofficial)
