import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal';
import FilterTabs from '../components/FilterTabs';
import { createTask, getTasks, toggleComplete, softDelete, restoreTask, deleteTask } from '../utils/api';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  // Create persistent userId on first visit
  useEffect(() => {
    let uid = localStorage.getItem('userId');
    if (!uid) {
      uid = uuidv4();
      localStorage.setItem('userId', uid);
    }
    setUserId(uid);
  }, []);

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId, filter]);

  const fetchTasks = async () => {
    const res = await getTasks(userId, filter);
    setTasks(res);
  };

  const handleCreate = async (data) => {
    await createTask({ ...data, userId });
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleComplete(id);
    fetchTasks();
  };

  const handleTrash = async (id) => {
    await softDelete(id);
    fetchTasks();
  };

  const handleRestore = async (id) => {
    await restoreTask(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <>
      <div className="header">
        <div className="user-id">👤 {userId.slice(0, 8)}...</div>
        <h1 className="app-title">📝 To-Do App</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Add Task</button>
      </div>

      <FilterTabs filter={filter} setFilter={setFilter} />

      <div className="task-container">
        {tasks.length === 0 && <p>No tasks found.</p>}
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={handleToggle}
            onTrash={handleTrash}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
};

export default Home;
