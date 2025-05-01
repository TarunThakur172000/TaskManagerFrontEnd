const API_URL = 'https://taskmanagerbackend-4ejg.onrender.com/api';

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Error signing up');
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Error logging in');
  return await response.json();
};

export const getProjects = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/projects`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching projects');
    return await response.json();  // This should include the taskStats now
  };
  

export const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error('Error creating project');
  return await response.json();
};

export const getTasksByProject = async (projectId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error fetching tasks');
    return await res.json();
  };
  
  export const createTask = async (taskData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Error creating task');
    return await res.json();
  };
  
  export const updateTask = async (taskId, taskData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Error updating task');
    return await res.json();
  };

  export const deleteTask = async (taskId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete task');
  };
  
  
  