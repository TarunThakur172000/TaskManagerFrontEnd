import React, { useEffect, useState } from 'react';
import { getTasksByProject, createTask, updateTask } from '../services/api';

function TaskManager({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByProject(projectId);
      setTasks(data);
    } catch {
      setError('Unable to fetch tasks.');
    }
  };

  const handleCreate = async () => {
    try {
      await createTask({ ...newTask, project: projectId });
      setNewTask({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch {
      setError('Failed to create task.');
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await updateTask(taskId, { status });
      fetchTasks();
    } catch {
      setError('Failed to update status.');
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Create Task Form */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="p-2 border rounded w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found. Create one above.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 border rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
