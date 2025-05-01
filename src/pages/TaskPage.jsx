import TaskManager from '../components/TaskManager';
import { useParams } from 'react-router-dom';
function TaskPage() {
  const { id: projectId } = useParams(); // assuming id is the projectId

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tasks</h1>
      <TaskManager projectId={projectId} />

    </div>
  );
}
export default TaskPage;