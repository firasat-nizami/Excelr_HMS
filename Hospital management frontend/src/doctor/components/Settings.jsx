import React, { useEffect, useState } from 'react';
import { save, load } from '../utils/storage';

const defaultProfile = { name: '', email: '', phone: '', specialization: '' };

const Settings = ({ initialProfile = defaultProfile }) => {
  const [profile, setProfile] = useState(() => load('doctorProfile', initialProfile));
  const [form, setForm] = useState(profile);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  // Persist profile
  useEffect(() => { save('doctorProfile', profile); }, [profile]);

  // Persist theme
  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save Profile
  const saveProfile = () => {
    const { name, email, phone, specialization } = form;
    if (!name || !email || !phone || !specialization) return alert('Please fill all fields!');
    setProfile(form);
    alert('Profile saved successfully!');
  };

  // Change Password
  const changePassword = () => {
    const saved = localStorage.getItem('doctorPassword') || 'admin123';
    const { current, new: nw, confirm: conf } = passwordForm;

    if (current !== saved) return alert('Current password is incorrect!');
    if (nw.length < 6) return alert('New password must be at least 6 characters!');
    if (nw !== conf) return alert('Passwords do not match!');

    localStorage.setItem('doctorPassword', nw);
    setPasswordForm({ current: '', new: '', confirm: '' });
    alert('Password changed successfully!');
  };

  return (
    <div className="main-content">
      <h2>Settings</h2>

      {/* Profile */}
      <div className="card">
        <h4>Profile</h4>
        <div className="form-row" style={{ marginTop: 8 }}>
          <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-row" style={{ marginTop: 8 }}>
          <input className="input" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input className="input" placeholder="Specialization" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
        </div>
      </div>

    

      {/* Change Password */}
      <div className="card" style={{ marginTop: 12 }}>
        <h4>Change Password</h4>
        <p>Use current password 'admin123' when testing.</p>
        <div className="form-row" style={{ marginTop: 8 }}>
          <input
            type="password"
            className="input"
            placeholder="Current Password"
            value={passwordForm.current}
            onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
          />
          <input
            type="password"
            className="input"
            placeholder="New Password"
            value={passwordForm.new}
            onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
          />
        </div>
        <div className="form-row" style={{ marginTop: 8 }}>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            value={passwordForm.confirm}
            onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" onClick={changePassword}>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
