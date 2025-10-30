import React, { useEffect, useState } from 'react';
import { formatDate, formatTime } from '../utils/format';
import { save, load } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const Appointments = ({ initialAppointments = [] }) => {
  const [appointments, setAppointments] = useState(() =>
    load('appointments', initialAppointments)
  );
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: '', date: '', time: '', status: 'Pending' });

  useEffect(() => {
    save('appointments', appointments);
  }, [appointments]);

  // Safe filtering
  const filtered = appointments.filter(a =>
    (a.patient || '').toLowerCase().includes(query.toLowerCase())
  );

  const addAppointment = () => {
    const { patient, date, time, status } = form;
    if (!patient || !date || !time) return alert('Please fill all fields!');

    const newAppointment = {
      id: uuidv4(),
      patient,
      date,
      time,
      status
    };

    setAppointments(prev => [...prev, newAppointment]);
    setForm({ patient: '', date: '', time: '', status: 'Pending' });
    setShowForm(false);
  };

  const deleteAppointment = id => {
    if (!confirm('Delete this appointment?')) return;
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const updateStatus = (id, status) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="main-content">
      <div className="flex-between">
        <h2>Appointments ({appointments.length})</h2>
        <div className="flex-center">
          <input
            className="input"
            placeholder="Search appointment..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            style={{ marginLeft: 8 }}
            onClick={() => setShowForm(s => !s)}
          >
            {showForm ? 'Cancel' : 'Add Appointment'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="form-row">
            <input
              className="input"
              placeholder="Patient"
              value={form.patient}
              onChange={e => setForm({ ...form, patient: e.target.value })}
            />
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input
              className="input"
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
            />
            <select
              className="input"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={addAppointment}>
              Save
            </button>
          </div>
        </div>
      )}

      <table style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id}>
              <td>{a.patient}</td>
              <td>{formatDate(a.date)}</td>
              <td>{formatTime(a.time)}</td>
              <td>
                <select
                  className="input"
                  value={a.status}
                  onChange={e => updateStatus(a.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteAppointment(a.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
