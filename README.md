## Strucute

/api - backend
/cleint - frontend

## Techstack

- React.js
- Nest.js
- Styled-components
- Redux-toolkit query
- PostgreSQL
- Sequelize
- Moment.js
- Formik
- Yup

# Installation

##### First you need to create .env files in /api

- .env.production
- .env.development

##### ENVS (Backend)

#

| Env-name      | Example               |
| ------------- | --------------------- |
| PORT          | 5000                  |
| SERVER_DOMAIN | http://localhost:5000 |
| CLIENT_DOMAIN | http://localhost:3000 |
| DB_NAME       | events-app            |
| DB_PORT       | 5432                  |
| DB_USER       | postgres              |
| DB_PASSWORD   | example               |
| DB_HOST       | localhost             |

##### ENVS (Frontend)

#

| Env-name             | Example               |
| -------------------- | --------------------- |
| REACT_APP_API_DOMAIN | http://localhost:5000 |

##### Install Backend

#

```
cd api
yarn install
```

##### Install Frontend

#

```
cd client
yarn install
```

# How to run application

## Backend (/api)

#### For developer mode

```
yarn start:dev
```

#### Production mode

```
yarn run build
yarn start:prod
```

#### Tests

```sh
yarn run test           // unit-tests
yarn run test:e2e       // e2e
```

## Frontend (/client)

#### Developer mode

```
yarn start
```

#### Build

```
yarn run build
```

#### Tests

```sh
yarn run test
```
