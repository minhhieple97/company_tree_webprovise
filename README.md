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
