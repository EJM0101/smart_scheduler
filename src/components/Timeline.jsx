import React from 'react';
function Timeline({ schedule }) {
  return (
    <div className="timeline">
      {schedule.map((task, index) => (
        <div
          key={index}
          className="task-block"
          style={{
            left: task.start * 30,
            width: (task.end - task.start) * 30,
            backgroundColor: `hsl(${(task.name.charCodeAt(0) * 50) % 360}, 80%, 60%)`
          }}
        >
          {task.name}
        </div>
      ))}
    </div>
  );
}
export default Timeline;