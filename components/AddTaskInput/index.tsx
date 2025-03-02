'use client'

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "@/clients/api";
import { CREATE_TASK } from "@/graphql/query/task";

const AddTaskInput = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      try {
        const response = await graphqlClient.request(CREATE_TASK, { title });
        return response.createTask;
      } catch (error) {
        console.error('GraphQL request failed:', error);
        throw new Error('Failed to create task. Please check if your GraphQL server is running.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle("");
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      console.error('Failed to create task:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (title.trim()) {
      createMutation.mutate(title.trim());
    }
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900 placeholder-gray-500"
        />
        <button 
          type="submit"
          disabled={createMutation.isPending}
          className={`bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors font-semibold shadow-sm inline-flex items-center gap-2 ${
            createMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <PlusIcon className="h-5 w-5" />
          {createMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddTaskInput;
