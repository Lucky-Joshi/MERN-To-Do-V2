import React from 'react';

const TaskCard = ({ task, onToggle, onTrash, onRestore, onDelete }) => {
  return (
    <div className="task-card">
      <div className={`priority-pill priority-${task.priority}`}>{task.priority}</div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}

      <div className="task-buttons">
        {!task.trashed && (
          <>
            <button className="btn-done" onClick={() => onToggle(task._id)}>
              {task.completed ? 'Undone' : 'Done'}
            </button>
            <button className="btn-trash" onClick={() => onTrash(task._id)}>Trash</button>
          </>
        )}
        {task.trashed && (
          <>
            <button className="btn-restore" onClick={() => onRestore(task._id)}>Restore</button>
            <button className="btn-delete" onClick={() => onDelete(task._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
