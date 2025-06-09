import React, { useState } from 'react';

function TaskForm({ addTask, simulateFIFO }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(1);
  const [arrivalTime, setArrivalTime] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name, duration: parseInt(duration), arrivalTime: parseInt(arrivalTime) });
    setName('');
    setDuration(1);
    setArrivalTime(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nom de tâche" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Durée" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
      <input type="number" placeholder="Arrivée" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} min="0" />
      <button type="submit">Ajouter</button>
      <button type="button" onClick={simulateFIFO}>Simuler FIFO</button>
    </form>
  );
}

export default TaskForm;