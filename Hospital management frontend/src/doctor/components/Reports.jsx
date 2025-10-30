import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/format';
import { save, load } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const Reports = ({ initialReports = [] }) => {
  const [reports, setReports] = useState(() => load('reports', initialReports));
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: '', type: '', date: '', status: 'Pending' });

  useEffect(() => {
    save('reports', reports);
  }, [reports]);

  const filtered = reports.filter(r => (r.patient || '').toLowerCase().includes(query.toLowerCase()));

  const addReport = () => {
    const { patient, type, date, status } = form;
    if (!patient || !type || !date) return alert('Please fill all fields!');

    const newReport = { id: uuidv4(), patient, type, date, status };
    setReports(prev => [...prev, newReport]);
    setForm({ patient: '', type: '', date: '', status: 'Pending' });
    setShowForm(false);
  };

  const deleteReport = id => {
    if (!confirm('Delete this report?')) return;
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const downloadPDF = r => {
    const content = `
Patient: ${r.patient}
Type: ${r.type}
Date: ${formatDate(r.date)}
Status: ${r.status}
    `;
    const w = window.open('', '_blank');
    w.document.write(`<pre style="font-size:16px; font-family:Arial;">${content}</pre>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="main-content">
      {/* Header & Search */}
      <div className="flex-between">
        <h2>Reports ({reports.length})</h2>
        <div className="flex-center">
          <input
            className="input"
            placeholder="Search report..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginLeft: 8 }} onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Cancel' : 'Add Report'}
          </button>
        </div>
      </div>

      {/* Add Report Form */}
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
              placeholder="Type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
            <select
              className="input"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={addReport}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div style={{ marginTop: 12 }} className="card">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '12px' }}>
                  No reports found
                </td>
              </tr>
            ) : (
              filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.patient}</td>
                  <td>{r.type}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.status}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => downloadPDF(r)}>
                      Print
                    </button>{' '}
                    <button className="btn btn-danger" onClick={() => deleteReport(r.id)}>
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

export default Reports;
