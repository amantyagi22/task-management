import { graphql } from "../../gql";

export const GET_TASKS = graphql(`
  query GetTasks {
    getTasks {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_TASK = graphql(`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      success
      message
      task {
        id
        title
        description
        completed
        createdAt
        updatedAt
      }
    }
  }
`);

export const UPDATE_TASK = graphql(`
  mutation UpdateTask($id: ID!, $title: String, $description: String!, $completed: Boolean) {
    updateTask(id: $id, title: $title, description: $description, completed: $completed) {
      success
      message
      task {
        id
        title
        description
        completed
        createdAt
        updatedAt
      }
    }
  }
`);

export const DELETE_TASK = graphql(`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      success
      message
      task {
        id
      }
    }
  }
`); 