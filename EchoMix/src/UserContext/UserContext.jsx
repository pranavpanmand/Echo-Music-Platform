import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const SongContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [song, setSong] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, song, setSong }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

