import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {

  const [logs, setLogs] = useState(
    () => JSON.parse(localStorage.getItem('breathingLogs')) || []
  );

  const [mealTime, setMealTime] = useState('');
  const [breathing, setBreathing] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [notes, setNotes] = useState('');
  const [meals, setMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: ''
  });
  const [activities, setActivities] = useState('');

  useEffect(() => {
    localStorage.setItem('breathingLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSave = () => {
    const today = new Date().toLocaleDateString();
    const newLog = {
      date: today,
      mealTime,
      breathing,
      oxygen,
      heartRate,
      notes,
      meals,
      activities
    };

    setLogs([...logs, newLog]);

    // Reset fields
    setMealTime('');
    setBreathing('');
    setOxygen('');
    setHeartRate('');
    setNotes('');
    setMeals({ breakfast: '', lunch: '', dinner: '', snacks: '' });
    setActivities('');
  };

  const breathingColors = {
    better: 'green',
    same: 'gray',
    worse: 'red'
  };

  const chartData = {
    labels: logs.map(log => `${log.date} ${log.mealTime}`),
    datasets: [
      {
        label: 'Oxygen Level (%)',
        data: logs.map(log => Number(log.oxygen)),
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.3,
        yAxisID: 'y1'
      },
      {
        label: 'Heart Rate (BPM)',
        data: logs.map(log => Number(log.heartRate)),
        borderColor: 'red',
        backgroundColor: 'pink',
        tension: 0.3,
        yAxisID: 'y1'
      },
      {
        label: 'Breathing Status',
        data: logs.map(log => {
          if (log.breathing === 'better') return 1;
          if (log.breathing === 'same') return 0.5;
          return 0;
        }),
        borderColor: 'green',
        backgroundColor: 'green',
        type: 'bar',
        yAxisID: 'y2'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    stacked: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Oxygen / Heart Rate' }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Breathing Status' },
        min: 0,
        max: 1
      }
    }
  };

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {});

  // Landing screen
  if (!mealTime) {
    return (
      <div
        style={{
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f8ff'
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          Select Meal Time
        </h1>

        {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
          <button
            key={meal}
            onClick={() => setMealTime(meal)}
            style={{
              width: '250px',
              padding: '25px',
              margin: '10px',
              fontSize: '22px',
              borderRadius: '15px',
              border: 'none',
              backgroundColor: '#1e90ff',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {meal}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh'
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        {mealTime} Log
      </h1>

      {/* Breathing */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}
        >
          How is your breathing today?
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['better', 'same', 'worse'].map(option => (
            <button
              key={option}
              onClick={() => setBreathing(option)}
              style={{
                flex: 1,
                margin: '0 5px',
                padding: '15px',
                fontSize: '18px',
                backgroundColor:
                  breathing === option ? breathingColors[option] : '#ddd',
                color: 'black',
                border: 'none',
                borderRadius: '10px'
              }}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Oxygen */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}
        >
          Oxygen Level (%)
        </label>
        <input
          type="number"
          min="80"
          max="100"
          value={oxygen}
          onChange={e => setOxygen(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
          placeholder="Enter oxygen level"
        />
      </div>

      {/* Heart Rate */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}
        >
          Heart Rate (BPM)
        </label>
        <input
          type="number"
          min="30"
          max="200"
          value={heartRate}
          onChange={e => setHeartRate(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
          placeholder="Enter heart rate"
        />
      </div>

      {/* Notes */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}
        >
          Notes
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
          placeholder="Any observations?"
        />
      </div>

      {/* Selected Meal */}
      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px',
            textTransform: 'capitalize'
          }}
        >
          {mealTime}
        </label>
        <input
          type="text"
          value={meals[mealTime.toLowerCase()]}
          onChange={e =>
            setMeals({ ...meals, [mealTime.toLowerCase()]: e.target.value })
          }
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
          placeholder={`Enter ${mealTime}`}
        />
      </div>

      {/* Activities */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}
        >
          Activities
        </label>
        <input
          type="text"
          value={activities}
          onChange={e => setActivities(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
          placeholder="Enter activities today"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '20px',
          backgroundColor: '#1e90ff',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      >
        Save Entry
      </button>

      {/* Charts */}
      {logs.length > 0 && (
        <div>
          <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Charts</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {/* History */}
      {Object.keys(groupedLogs).length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>History</h2>
          {Object.keys(groupedLogs).map(date => (
            <div
              key={date}
              style={{
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: '#e6f2ff',
                borderRadius: '10px'
              }}
            >
              <h3 style={{ fontWeight: 'bold' }}>{date}</h3>
              {groupedLogs[date].map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '10px'
                  }}
                >
                  <strong>{log.mealTime}</strong>
                  <br />
                  Breathing: {log.breathing}
                  <br />
                  Oxygen: {log.oxygen}
                  <br />
                  Heart Rate: {log.heartRate}
                  <br />
                  Notes: {log.notes}
                  <br />
                  Activities: {log.activities}
                  <br />
                  Meal: {log.meals[log.mealTime.toLowerCase()]}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}