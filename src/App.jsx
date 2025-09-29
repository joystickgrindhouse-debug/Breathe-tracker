import React, { useState, useEffect } from "react"; import { Line } from "react-chartjs-2"; import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function App() { const [logs, setLogs] = useState(() => { const saved = localStorage.getItem("breathingLogs"); return saved ? JSON.parse(saved) : []; });

const [breathing, setBreathing] = useState(""); const [oxygen, setOxygen] = useState(""); const [heartRate, setHeartRate] = useState(""); const [notes, setNotes] = useState(""); const [meals, setMeals] = useState({ breakfast: "", lunch: "", dinner: "", snacks: "" }); const [activities, setActivities] = useState("");

useEffect(() => { localStorage.setItem("breathingLogs", JSON.stringify(logs)); }, [logs]);

// In-app reminder popups while PWA is open useEffect(() => { const scheduleReminder = (ms, message) => { setTimeout(() => alert(message), ms); }; scheduleReminder(5000, "Morning check-in: How's your breathing? Log breakfast!"); scheduleReminder(15000, "Lunch check-in: Update breathing & meals!"); scheduleReminder(25000, "Afternoon check-in: Final breathing & dinner/snacks!"); }, []);

const handleSave = () => { const today = new Date().toLocaleDateString(); const newLog = { date: today, breathing, oxygen, heartRate, notes, meals, activities }; setLogs([...logs, newLog]); setBreathing(""); setOxygen(""); setHeartRate(""); setNotes(""); setMeals({ breakfast: "", lunch: "", dinner: "", snacks: "" }); setActivities(""); };

const breathingColors = { better: 'green', same: 'gray', worse: 'red' };

// Chart data combining Oxygen, Heart Rate, Breathing const chartData = { labels: logs.map(log => log.date), datasets: [ { label: 'Oxygen Level (%)', data: logs.map(log => Number(log.oxygen)), borderColor: 'blue', backgroundColor: 'lightblue', tension: 0.3, yAxisID: 'y1' }, { label: 'Heart Rate (BPM)', data: logs.map(log => Number(log.heartRate)), borderColor: 'red', backgroundColor: 'pink', tension: 0.3, yAxisID: 'y1' }, { label: 'Breathing Status', data: logs.map(log => { if (log.breathing === 'better') return 1; if (log.breathing === 'same') return 0.5; return 0; }), borderColor: 'green', backgroundColor: 'green', type: 'bar', yAxisID: 'y2' } ] };

const chartOptions = { responsive: true, interaction: { mode: 'index', intersect: false }, stacked: false, plugins: { legend: { position: 'top' } }, scales: { y1: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Oxygen / Heart Rate' } }, y2: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Breathing Status' }, min: 0, max: 1 } } };

return ( <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', fontSize: '18px', backgroundColor: '#f0f8ff', minHeight: '100vh' }}> <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Breathing & Wellness Tracker</h1>

<div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>How is your breathing today?</label>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {['better', 'same', 'worse'].map(option => (
        <button key={option} onClick={() => setBreathing(option)} style={{ flex: 1, margin: '0 5px', padding: '15px', fontSize: '18px', backgroundColor: breathing === option ? breathingColors[option] : '#ddd', color: 'black', border: 'none', borderRadius: '10px' }}>{option.charAt(0).toUpperCase() + option.slice(1)}</button>
      ))}
    </div>
  </div>

  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Oxygen Level (%)</label>
    <input type="number" min="80" max="100" value={oxygen} onChange={e => setOxygen(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ccc' }} placeholder="Enter oxygen level" />
  </div>

  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Heart Rate (BPM)</label>
    <input type="number" min="30" max="200" value={heartRate} onChange={e => setHeartRate(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ccc' }} placeholder="Enter heart rate" />
  </div>

  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Notes</label>
    <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ccc' }} placeholder="Any observations?" />
  </div>

  {Object.keys(meals).map(meal => (
    <div key={meal} style={{ marginBottom: '15px' }}>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'capitalize' }}>{meal}</label>
      <input type="text" value={meals[meal]} onChange={e => setMeals({ ...meals, [meal]: e.target.value })} style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ccc' }} placeholder={`Enter ${meal}`} />
    </div>
  ))}

  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Activities</label>
    <input type="text" value={activities} onChange={e => setActivities(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '10px', border: '1px solid #ccc' }} placeholder="Enter activities today" />
  </div>

  <button onClick={handleSave} style={{ width: '100%', padding: '15px', fontSize: '20px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Save Entry</button>

  {logs.length > 0 && (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Trends</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  )}

  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '40px', marginBottom: '15px', textAlign: 'center' }}>History</h2>
  {logs.length === 0 && <p>No logs yet.</p>}
  {logs.map((log, i) => (
    <div key={i} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px', backgroundColor: '#fff' }}>
      <p><strong>{log.date}</strong></p>
      <p>Breathing: <span style={{ color: breathingColors[log.breathing] }}>{log.breathing}</span></p>
      <p>Oxygen Level: {log.oxygen}%</p>
      <p>Heart Rate: {log.heartRate} BPM</p>
      <p>Notes: {log.notes}</p>
      <p>Breakfast: {log.meals.breakfast}</p>
      <p>Lunch: {log.meals.lunch}</p>
      <p>Dinner: {log.meals.dinner}</p>
      <p>Snacks: {log.meals.snacks}</p>
      <p>Activities: {log.activities}</p>
    </div>
  ))}
</div>

); }

