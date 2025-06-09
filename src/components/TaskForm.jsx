import React, { useState } from 'react';
function TaskForm({ addTask, simulate, quantum, setQuantum, algorithm, setAlgorithm }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(1);
  const [arrivalTime, setArrivalTime] = useState(0);
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      name,
      duration: parseInt(duration),
      arrivalTime: parseInt(arrivalTime),
      priority: parseInt(priority)
    });
    setName('');
    setDuration(1);
    setArrivalTime(0);
    setPriority(1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Durée" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
        <input type="number" placeholder="Arrivée" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} min="0" />
        <input type="number" placeholder="Priorité" value={priority} onChange={e => setPriority(e.target.value)} min="1" />
        <button type="submit">Ajouter</button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <label>Algorithme :</label>
        <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
          <option value="FIFO">FIFO</option>
          <option value="RoundRobin">Round Robin</option>
          <option value="Priorité">Priorité</option>
        </select>
        {algorithm === 'RoundRobin' && (
          <>
            <label style={{ marginLeft: '10px' }}>Quantum :</label>
            <input type="number" value={quantum} onChange={e => setQuantum(parseInt(e.target.value))} min="1" style={{ width: '60px' }} />
          </>
        )}
        <button onClick={simulate} style={{ marginLeft: '10px' }}>Simuler</button>
      </div>
    </>
  );
}
export default TaskForm;