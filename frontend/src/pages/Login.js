import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/members/login', loginData);
      const token = response.data.accessToken; 
      const id = response.data.id;
      
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        setIsLoggedIn(true);
        alert("로그인 성공!");
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert("로그인 실패! 아이디나 비밀번호를 확인하세요.");
    }
  };

  return (
    // min-h-screen 대신 calc를 사용하여 Navbar 높이(64px)를 제외한 나머지만 채웁니다.
    <div className="min-h-[calc(100vh-65px)] bg-gray-50 pt-1"> 
      {/* 2. mt-20 대신 pt-20을 사용하거나 그대로 mt-20을 써도 됩니다. */}
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            placeholder="이메일" 
            onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
          />
          <input 
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            type="password" 
            placeholder="비밀번호" 
            onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-2">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;