import React from 'react';

function ProjectCard({ project }) {
  const { name, _id, taskStats } = project;
  const total = taskStats?.total || 0;
  const completed = taskStats?.completed || 0;
  const pending = taskStats?.pending || 0;

  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">Total Tasks: {total}</p>
      <p className="text-green-600">Completed: {completed}</p>
      <p className="text-yellow-600">Pending: {pending}</p>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.href = `/tasks/${_id}`}
      >
        View Tasks
      </button>
    </div>
  );
}

export default ProjectCard;
