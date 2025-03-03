'use client'

import { PencilSquareIcon, TrashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "@/clients/api";
import { UPDATE_TASK, DELETE_TASK } from "@/graphql/query/task";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (variables: { id: string; title?: string; description: string; completed?: boolean }) => {
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
    if (editedTitle.trim() !== task.title || editedDescription.trim() !== task.description) {
      updateMutation.mutate({
        id: task.id,
        title: editedTitle.trim(),
        description: editedDescription.trim() || '',
      });
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {
              updateMutation.mutate({
                id: task.id,
                completed: !task.completed,
                description: task.description || '',
              });
            }}
            className="h-5 w-5 rounded border-gray-300 text-orange-400 focus:ring-orange-400"
          />
          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900"
                autoFocus
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900 resize-none"
                rows={3}
                placeholder="Add a description..."
              />
            </div>
          ) : (
            <div className="flex-1">
              <h3 className={`text-gray-900 font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 mt-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
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
                  setEditedDescription(task.description);
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
    </div>
  );
};

export default TaskCard;
