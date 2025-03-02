import AddTaskInput from '@/components/AddTaskInput';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 py-8">
      <div className="max-w-[60%] mx-auto flex flex-col gap-6 p-4">
        {/* Header */}
        <Header title="Task Manager" />
        
        {/* Input and Button Section */}
        <AddTaskInput />

        {/* Tasks List Section */}
        <TaskList />
      </div>
    </div>
  );
}
