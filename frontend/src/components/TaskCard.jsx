function TaskCard({ task, onStatusChange }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'status-badge status-completed';
            case 'In Progress': return 'status-badge status-progress';
            default: return 'status-badge status-pending';
        }
    };

    return (
        <div className='task-card'>
            <div className='task-card-header'>
                <h3>{task.title}</h3>
                <span className={getStatusClass(task.status)}>{task.status}</span>
            </div>

            <p className='task-desc'>{task.description}</p>

            <div className='task-card-meta'>
                {task.project && (
                    <p><strong>Project:</strong> {task.project.title}</p>
                )}
                {task.assignedTo && (
                    <p><strong>Assigned to:</strong> {task.assignedTo.name}</p>
                )}
                {task.dueDate && (
                    <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                )}
            </div>

            {onStatusChange && (
                <div className='task-card-actions'>
                    <button 
                        className={`action-btn ${task.status === 'Pending' ? 'active' : ''}`}
                        onClick={() => onStatusChange(task._id, 'Pending')}
                    >
                        Pending
                    </button>
                    <button 
                        className={`action-btn ${task.status === 'In Progress' ? 'active' : ''}`}
                        onClick={() => onStatusChange(task._id, 'In Progress')}
                    >
                        In Progress
                    </button>
                    <button 
                        className={`action-btn ${task.status === 'Completed' ? 'active' : ''}`}
                        onClick={() => onStatusChange(task._id, 'Completed')}
                    >
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskCard;