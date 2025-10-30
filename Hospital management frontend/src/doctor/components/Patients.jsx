import React, { useEffect, useState } from 'react';
import { save, load } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const Patients = ({ initialPatients = [] }) => {
  const [patients, setPatients] = useState(() => load('patients', initialPatients));
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: '', disease: '' });

  useEffect(() => {
    save('patients', patients);
  }, [patients]);

  const filtered = patients.filter(p => (p.name || '').toLowerCase().includes(query.toLowerCase()));

  const addPatient = () => {
    const { name, age, gender, disease } = form;
    if (!name || !age || !gender || !disease) return alert('Please fill all fields!');
    
    const newPatient = {
      id: uuidv4(),
      name,
      age: Number(age),
      gender,
      disease
    };
    setPatients(prev => [...prev, newPatient]);
    setForm({ name: '', age: '', gender: '', disease: '' });
    setShowForm(false);
  };

  const deletePatient = id => {
    if (!confirm('Delete this patient?')) return;
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="main-content">
      {/* Header & Search */}
      <div className="flex-between">
        <h2>Patients ({patients.length})</h2>
        <div className="flex-center">
          <input
            className="input"
            placeholder="Search patient..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginLeft: 8 }} onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Cancel' : 'Add Patient'}
          </button>
        </div>
      </div>

      {/* Add Patient Form */}
      {showForm && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="form-row">
            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input
              className="input"
              placeholder="Gender"
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
            />
            <input
              className="input"
              placeholder="Disease"
              value={form.disease}
              onChange={e => setForm({ ...form, disease: e.target.value })}
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={addPatient}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Patients Table */}
      <div style={{ marginTop: 12 }} className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Disease</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '12px' }}>
                  No patients found
                </td>
              </tr>
            ) : (
              filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.disease}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deletePatient(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
