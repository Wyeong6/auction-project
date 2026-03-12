import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login({ setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. 서버에 로그인 요청 (백엔드 엔드포인트 확인 필수)
      const response = await axios.post('http://localhost:8080/api/members/login', loginData);
      
      // 2. 토큰 추출 (백엔드 응답 구조에 따라 response.data.token 등으로 수정)
      const token = response.data.accessToken; 
      
      if (token) {
        // 3. 브라우저 저장소에 토큰 저장
        localStorage.setItem('token', token);
        // 4. 전역 로그인 상태 변경
        setIsLoggedIn(true);
        alert("로그인 성공!");
        navigate('/'); // 메인으로 이동
      }
    } catch (err) {
      console.error(err);
      alert("로그인 실패! 아이디나 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} /> {/* 로그인을 시도 중이므로 임시 true 혹은 로직에 따라 조절 */}
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin}>
          <input className="w-full p-3 mb-4 border rounded-lg" placeholder="이메일" 
                 onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          <input className="w-full p-3 mb-6 border rounded-lg" type="password" placeholder="비밀번호" 
                 onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;