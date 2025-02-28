import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 py-8">
      <div className="max-w-[60%] mx-auto flex flex-col gap-6 p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800">Task Manager</h1>
        
        {/* Input and Button Section */}
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900 placeholder-gray-500"
          />
          <button 
            className="bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors font-semibold shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <PlusIcon className="h-5 w-5" />
            Add
          </button>
        </div>

        {/* Tasks List Section */}
        <div className="flex flex-col gap-3">
          {/* Sample Task Items - These will be dynamic later */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <span className="text-gray-900">Sample Task 1</span>
            <div className="flex gap-3">
              <button className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer">
                <PencilSquareIcon className="h-5 w-5" />
                Edit
              </button>
              <button className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer">
                <TrashIcon className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <span className="text-gray-900">Sample Task 2</span>
            <div className="flex gap-3">
              <button className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer">
                <PencilSquareIcon className="h-5 w-5" />
                Edit
              </button>
              <button className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer">
                <TrashIcon className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
