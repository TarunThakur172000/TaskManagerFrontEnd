import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject } from '../services/api';
import ProjectCard from '../components/ProjectCard';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if token not found
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      
    } catch (err) {
      setError('Unable to fetch projects');
    }
  };

  const handleCreateProject = async () => {
    if (projects.length >= 4) {
      setShowPopup(true);
      return;
    }
    try {
      await createProject({ name: projectName });
      setProjectName('');
      fetchProjects();
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page on logout
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Projects</h1>
        
        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Create Project Section */}
        <div className="flex items-center mb-6 space-x-4">
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateProject}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {projects.length === 0 ? (
            <div className="text-gray-500 text-center col-span-3">No projects yet. Start creating one!</div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>

        {/* Logout Button */}
        <div className="text-right mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {/* Popup for Project Limit */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Project limit reached (4)</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
