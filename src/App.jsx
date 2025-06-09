import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import Timeline from './components/Timeline';

function App() {
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const simulateFIFO = () => {
    const result = [];
    let time = 0;
    tasks
      .sort((a, b) => a.arrivalTime - b.arrivalTime)
      .forEach(task => {
        const start = Math.max(time, task.arrivalTime);
        result.push({ name: task.name, start, end: start + task.duration });
        time = start + task.duration;
      });
    setSchedule(result);
  };

  return (
    <div className="container">
      <h1>🧠 Smart Scheduler</h1>
      <p>Simulation pédagogique d'ordonnancement FIFO.</p>
      <TaskForm addTask={addTask} simulateFIFO={simulateFIFO} />
      <Timeline schedule={schedule} />
    </div>
  );
}

export default App;