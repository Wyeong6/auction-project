import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 추가
import Navbar from '../components/Navbar';

function Signup() {
  const [formData, setFormData] = useState({ name: '', password: '', email: '' });
  const navigate = useNavigate(); // 페이지 이동용 훅

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 서버의 회원가입 API 호출
      await axios.post('http://localhost:8080/api/members/join', formData);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate('/'); // 가입 성공 시 메인으로 이동
    } catch (err) {
      console.error(err);
      alert("회원가입 실패, 입력값을 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSignup}>
          <input className="w-full p-3 mb-4 border rounded-lg" type="email" placeholder="이메일" 
                 onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input className="w-full p-3 mb-4 border rounded-lg" type="password" placeholder="비밀번호" 
                 onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input className="w-full p-3 mb-4 border rounded-lg" placeholder="이름" 
                 onChange={(e) => setFormData({...formData, name: e.target.value})} />       
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;