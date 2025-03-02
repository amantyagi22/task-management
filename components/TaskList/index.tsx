'use client'

import TaskCard from "@/components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "@/clients/api";
import { GET_TASKS } from "@/graphql/query/task";
import { GetTasksQuery, Task } from "@/gql/graphql";

const TaskList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response : GetTasksQuery = await graphqlClient.request(GET_TASKS);
      return response.getTasks;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="flex flex-col gap-3">
      {data?.filter((task): task is NonNullable<typeof task> => task !== null)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskList;
