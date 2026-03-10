import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // 경로 확인 필수!

function Main() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:8080/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50"> {/* 여기서 p-8을 제거했습니다 */}
      {/* 1. 최상단에 Navbar 배치 */}
      <Navbar isLoggedIn={isLoggedIn} /> 

      {/* 2. 본문 영역을 별도 div로 감싸 여백(p-8) 부여 */}
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🔨 실시간 경매 마켓
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'BIDDING' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.status === 'BIDDING' ? '🔥 진행 중' : '🏁 종료'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{item.description}</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">현재가</span>
                    <span className="text-lg font-bold text-blue-600">
                      {item.currentPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-400 mb-6">
                  <span className="mr-2">⏰ 마감시간:</span>
                  <span>{new Date(item.endTime).toLocaleString()}</span>
                </div>

                <button 
                  disabled={item.status === 'ENDED'}
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    item.status === 'BIDDING' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {item.status === 'BIDDING' ? '입찰하기' : '경매 마감'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;