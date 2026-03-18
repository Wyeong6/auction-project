import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 추가
import Navbar from '../components/Navbar';

function Signup() {
  const [formData, setFormData] = useState({ name: '', password: '', email: '', isAdmin: false });
  const navigate = useNavigate(); // 페이지 이동용 훅

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 서버의 회원가입 API 호출
      await axios.post('http://localhost:8080/api/members/join', formData);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate('/login'); // 가입 성공 시 메인으로 이동
    } catch (err) {
      console.error(err);
      alert("회원가입 실패, 입력값을 확인해주세요.");
    }
  };

return (
    <div className="min-h-[calc(100vh-65px)] bg-gray-50 pt-1">
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSignup}>
          <input className="w-full p-3 mb-4 border rounded-lg" type="email" placeholder="이메일" 
                 onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input className="w-full p-3 mb-4 border rounded-lg" type="password" placeholder="비밀번호" 
                 onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <input className="w-full p-3 mb-4 border rounded-lg" placeholder="이름" 
                 onChange={(e) => setFormData({...formData, name: e.target.value})} required /> 

          {/* ✅ 관리자 권한 체크박스 추가 */}
          <div className="flex items-center mb-6 p-1">
            <input 
              type="checkbox" 
              id="admin-check"
              className="w-5 h-5 mr-2 cursor-pointer"
              checked={formData.isAdmin}
              onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
            />
            <label htmlFor="admin-check" className="text-gray-600 font-medium cursor-pointer select-none">
              관리자 권한으로 가입하기
            </label>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );}
export default Signup;