'use client'

import { PencilSquareIcon, TrashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "@/clients/api";
import { UPDATE_TASK, DELETE_TASK } from "@/graphql/query/task";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (variables: { id: string; title?: string; completed?: boolean }) => {
      return await graphqlClient.request(UPDATE_TASK, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await graphqlClient.request(DELETE_TASK, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSave = () => {
    if (editedTitle.trim() !== task.title) {
      updateMutation.mutate({
        id: task.id,
        title: editedTitle.trim(),
      });
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => {
            updateMutation.mutate({
              id: task.id,
              completed: !task.completed,
            });
          }}
          className="h-5 w-5 rounded border-gray-300 text-orange-400 focus:ring-orange-400"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900"
            autoFocus
          />
        ) : (
          <span className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <button 
              className="text-green-500 hover:text-green-700 inline-flex items-center gap-1 mr-4"
              onClick={handleSave}
            >
              <CheckIcon className="h-5 w-5" />
              Save
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 inline-flex items-center gap-1"
              onClick={() => {
                setEditedTitle(task.title);
                setIsEditing(false);
              }}
            >
              <XMarkIcon className="h-5 w-5" />
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 mr-4"
              onClick={() => setIsEditing(true)}
            >
              <PencilSquareIcon className="h-5 w-5" />
              Edit
            </button>
            <button 
              className="text-red-500 hover:text-red-700 inline-flex items-center gap-1"
              onClick={() => deleteMutation.mutate(task.id)}
            >
              <TrashIcon className="h-5 w-5" />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
