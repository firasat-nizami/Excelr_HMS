// utils/storage.js

// Load from localStorage, fallback to defaultValue
export function load(key, defaultValue) {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

// Save to localStorage
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}