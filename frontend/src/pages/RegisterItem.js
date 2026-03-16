import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startPrice: '',
    durationMinutes: 60, // 기본값 1시간
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 시 저장해둔 유저 ID를 가져옵니다. (없으면 1로 테스트하거나 로그인을 유도)
    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId) {
    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
    navigate('/login');
    return;
  }

    const requestData = {
      title: formData.title,
      description: formData.description,
      startPrice: parseInt(formData.startPrice),
      durationMinutes: parseInt(formData.durationMinutes),
      sellerId: parseInt(storedUserId)
    };

    try {
      await axios.post('http://localhost:8080/api/items', requestData);
      alert('경매 물건이 성공적으로 등록되었습니다!');
      navigate('/'); // 등록 후 메인 페이지로 이동
    } catch (error) {
      console.error('등록 실패:', error);
      alert('물건 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">새 경매 물건 등록</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">물건 제목</label>
          <input
            type="text" name="title" required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="예: 빈티지 턴테이블"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">물건 설명</label>
          <textarea
            name="description" required rows="5"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="물건의 상태나 상세 정보를 입력해주세요."
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">시작 가격 (원)</label>
            <input
              type="number" name="startPrice" required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="10,000"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">경매 기간 (분)</label>
            <input
              type="number" name="durationMinutes" required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="60"
              value={formData.durationMinutes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transform active:scale-[0.98] transition-all shadow-lg shadow-blue-100"
          >
            경매 시작하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterItem;