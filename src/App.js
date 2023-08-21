import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // Your Firebase config details here
};

// Initialize Firebase if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setAuthChecked(true); // Authentication status has been checked
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!authChecked) {
    // Loading state, you can show a loading spinner or similar
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
