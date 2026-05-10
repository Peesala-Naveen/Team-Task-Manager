function TaskCard({ task }) {
    return (
        <div className='task-card'>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                <strong>Status:</strong> {task.status}
            </p>

            <span>{task.project?.title || 'No Project'}</span>
        </div>
    );
}

export default TaskCard;