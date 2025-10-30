import { createContext } from 'react';

// Minimal patient auth context placeholder so existing components can import it
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});


