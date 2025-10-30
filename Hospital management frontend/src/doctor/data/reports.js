const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;

export default [
  { patient: 'Riya Sharma', type: 'Blood Test', date: todayStr, status: 'Pending' },
  { patient: 'Arjun Patel', type: 'X-Ray', date: todayStr, status: 'Completed' },
  { patient: 'Neha Verma', type: 'MRI', date: todayStr, status: 'Pending' },
  { patient: 'Karan Singh', type: 'ECG', date: todayStr, status: 'Completed' },
];
