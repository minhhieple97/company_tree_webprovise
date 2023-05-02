## Setting up the .env file and run project

This project uses environment variables to configure various settings. To set up the environment variables for this project, you will need to create a `.env` file in the root of the project directory.

An example `.env.example` file is provided in the root of the project directory. This file contains example values for all of the environment variables used by this project. To set up your `.env` file, follow these steps:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file in a text editor.
3. Replace the example values with your own values for each environment variable.
4. Save and close the `.env` file.

Once you have completed these steps, your `.env` file will be set up and ready to use.

## Running the project

After setting up the `.env` file, you can run the project using the `npm run start:dev` command. This will start the development server and allow you to access the project at `http://localhost:3000`.

# Example GraphQL Query

Here is an example of a GraphQL query and its response:

```graphql
query {
  company(id: "uuid-1") {
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
        parentId
        cost
        children {
          id
        }
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
        "id": "uuid-1",
        "parentId": "0",
        "cost": 52983,
        "createdAt": "2021-02-26T00:55:36.632Z",
        "children": [
          {
            "id": "uuid-2",
            "parentId": "uuid-1",
            "name": "Stamm LLC",
            "cost": 5199,
            "children": [
              {
                "id": "uuid-4",
                "parentId": "uuid-2",
                "cost": 1340,
                "children": []
              },
              {
                "id": "uuid-7",
                "parentId": "uuid-2",
                "cost": 1636,
                "children": []
              },
              {
                "id": "uuid-19",
                "parentId": "uuid-2",
                "cost": 794,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-3",
            "parentId": "uuid-1",
            "name": "Blanda, Langosh and Barton",
            "cost": 15713,
            "children": [
              {
                "id": "uuid-5",
                "parentId": "uuid-3",
                "cost": 1288,
                "children": []
              },
              {
                "id": "uuid-6",
                "parentId": "uuid-3",
                "cost": 2512,
                "children": []
              },
              {
                "id": "uuid-9",
                "parentId": "uuid-3",
                "cost": 3086,
                "children": []
              },
              {
                "id": "uuid-17",
                "parentId": "uuid-3",
                "cost": 4072,
                "children": []
              },
              {
                "id": "uuid-20",
                "parentId": "uuid-3",
                "cost": 908,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-8",
            "parentId": "uuid-1",
            "name": "Bartell - Mosciski",
            "cost": 28817,
            "children": [
              {
                "id": "uuid-10",
                "parentId": "uuid-8",
                "cost": 4288,
                "children": []
              },
              {
                "id": "uuid-11",
                "parentId": "uuid-8",
                "cost": 12236,
                "children": [
                  {
                    "id": "uuid-12"
                  },
                  {
                    "id": "uuid-14"
                  }
                ]
              },
              {
                "id": "uuid-13",
                "parentId": "uuid-8",
                "cost": 1686,
                "children": []
              },
              {
                "id": "uuid-15",
                "parentId": "uuid-8",
                "cost": 4725,
                "children": []
              },
              {
                "id": "uuid-16",
                "parentId": "uuid-8",
                "cost": 3277,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-18",
            "parentId": "uuid-1",
            "name": "Walter, Schmidt and Osinski",
            "cost": 2033,
            "children": []
          }
        ]
      }
    ]
  }
}
```
