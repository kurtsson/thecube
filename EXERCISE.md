# The Cube

## Links
  - [The Cube](https://thecube.daresaycloud.co/graphql)
  - [Visual Studio Code](https://code.visualstudio.com)
  - [Apollo Graphql](https://www.apollographql.com/docs/)
  - [React](https://reactjs.org/docs/getting-started.html)
  - [GraphQL](https://graphql.org/learn/)
  - [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)

## What is this?
The cube consists of 6 sides with their current color. The server holds the current state of the cube and you can change the color of a side by mutating it.

## Task
### 1. View the cube

Your first task is to view the current state of the cube by querying the server using GraphQL and drawing it in a browser using React. Use this tech stack:
  - React and TypeScript using `create-react-app --template typescript`
  - Apollo Client

I also recommend you quering the graphql schema using [Insomina](https://insomnia.rest), [GraphiQL](https://github.com/graphql/graphiql) or [Apollo Studio](https://studio.apollographql.com/sandbox?endpoint=http%3A%2F%2Fthecube.daresaycloud.co%2Fgraphql) so that you know how the data structure looks like.

### 2. Change the cube

Your second task is to mutate the colors of the cube. Read a color in you UI and create a mutation that sends that to the server. Remember there are only ONE cube so you will also change the color of the other teams cubes. 😈

### 3. Subscribe to the cube

Using a graphql subscription you can listen to changes to the cube. There is a [websocket](https://thecube.daresaycloud.co/graphql) on the server that will post any changes that has been made. Make the visualization of the cube live!

## Need help?
If you are stuck, there are scaffolds for the different tasks ready made that you can get from Martin. But first, try yourself :D