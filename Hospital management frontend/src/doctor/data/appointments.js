const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;

export default [
  { patient: 'Riya Sharma', date: todayStr, time: '10:00', status: 'Pending' },
  { patient: 'Arjun Patel', date: todayStr, time: '11:30', status: 'Confirmed' },
  { patient: 'Neha Verma', date: todayStr, time: '13:00', status: 'Cancelled' },
];
