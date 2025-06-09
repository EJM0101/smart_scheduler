import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import Timeline from './components/Timeline';
function App() {
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [algorithm, setAlgorithm] = useState('FIFO');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const simulate = () => {
    let result = [];
    let time = 0;
    if (algorithm === 'FIFO') {
      const queue = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
      queue.forEach(task => {
        const start = Math.max(time, task.arrivalTime);
        result.push({ name: task.name, start, end: start + task.duration });
        time = start + task.duration;
      });
    } else if (algorithm === 'RoundRobin') {
      const queue = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
      const remaining = queue.map(t => ({ ...t, remaining: t.duration, nextAvailableTime: t.arrivalTime }));
      while (remaining.length > 0) {
        let index = remaining.findIndex(t => t.arrivalTime <= time || t.nextAvailableTime <= time);
        if (index === -1) {
          time++;
          continue;
        }
        let task = remaining[index];
        const start = time;
        const execTime = Math.min(quantum, task.remaining);
        const end = start + execTime;
        result.push({ name: task.name, start, end });
        time = end;
        task.remaining -= execTime;
        task.nextAvailableTime = time;
        if (task.remaining <= 0) {
          remaining.splice(index, 1);
        } else {
          remaining.splice(index, 1);
          remaining.push(task);
        }
      }
    } else if (algorithm === 'Priorité') {
      const queue = [...tasks].sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
      queue.forEach(task => {
        const start = Math.max(time, task.arrivalTime);
        result.push({ name: task.name, start, end: start + task.duration });
        time = start + task.duration;
      });
    }
    setSchedule(result);
  };

  return (
    <div className="container">
      <h1>🧠 Smart Scheduler</h1>
      <p>Simulation d'ordonnancement : FIFO, Round Robin (quantum), Priorité</p>
      <TaskForm
        addTask={addTask}
        simulate={simulate}
        quantum={quantum}
        setQuantum={setQuantum}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
      <Timeline schedule={schedule} />
    </div>
  );
}
export default App;