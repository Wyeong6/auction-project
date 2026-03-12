// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지가 새로고침되어도 토큰이 있으면 로그인 유지
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;