## Setting up the .env file

This project uses environment variables to configure various settings. To set up the environment variables for this project, you will need to create a `.env` file in the root of the project directory.

An example `.env.example` file is provided in the root of the project directory. This file contains example values for all of the environment variables used by this project. To set up your `.env` file, follow these steps:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file in a text editor.
3. Replace the example values with your own values for each environment variable.
4. Save and close the `.env` file.

Once you have completed these steps, your `.env` file will be set up and ready to use.

## Running the project

After setting up the `.env` file, you can run the project using the `npm run start:dev` command. This will start the development server and allow you to access the project at `http://localhost:3000`.

# Integration Test for Nest.js GraphQL

This project uses nest.js, graphql, supertest-graphql and graphql-tag to set up and run integration tests for a graphql endpoint.

## Prerequisites

- Node.js and npm installed
- A graphql endpoint running on http://localhost:3000/graphql

## Installation

- Clone this repository and navigate to the project folder
- Run `npm install` to install the dependencies
- Run `npm run test:int` to run the integration test

# Example GraphQL Query

Here is an example of a GraphQL query and its response:

```graphql
query {
  company(id: "uuid-2") {
    id
    parentId
    cost
    createdAt
    children {
      id
      parentId
      name
      cost
      children {
        id
      }
    }
  }
}
```

```json
{
  "data": {
    "company": [
      {
        "id": "uuid-2",
        "parentId": "uuid-1",
        "cost": 5199,
        "createdAt": "2021-02-25T10:35:32.978Z",
        "children": [
          {
            "id": "uuid-4",
            "parentId": "uuid-2",
            "name": "Price and Sons",
            "cost": 1340,
            "children": []
          },
          {
            "id": "uuid-7",
            "parentId": "uuid-2",
            "name": "Zieme - Mills",
            "cost": 1636,
            "children": []
          },
          {
            "id": "uuid-19",
            "parentId": "uuid-2",
            "name": "Schneider - Adams",
            "cost": 794,
            "children": []
          }
        ]
      }
    ]
  }
}
```
