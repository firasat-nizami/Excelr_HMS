// utils/format.js

// Format date as DD-MM-YYYY
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// Format time as HH:MM AM/PM
export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [hour, minute] = timeStr.split(':');
  let h = parseInt(hour);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${minute} ${ampm}`;
}
