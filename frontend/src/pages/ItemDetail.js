import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/items/${id}`);
        console.log(response.data);
        setItem(response.data);
      } catch (err) {
        console.error("상품 정보를 불러오는데 실패했습니다.", err);
      }
    };
    fetchItem();
  }, [id]);

  // 날짜 포맷팅 함수 (초 단위 제외)
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || bidAmount <= item.currentPrice) {
      alert("현재가보다 높은 금액을 입력해주세요.");
      return;
    }
    alert(`${Number(bidAmount).toLocaleString()}원 입찰을 시도합니다.`);
  };

  if (!item) return <div className="p-10 text-center text-gray-500">상품 정보를 불러오는 중입니다...</div>;

  // 유찰 여부 확인 (현재가가 시작가와 같으면 입찰자가 없는 것으로 판단)
  const isUnsold = item.status === 'ENDED' && item.currentPrice === item.startPrice;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-1/2 bg-gray-100 h-[450px] flex items-center justify-center border-r border-gray-50">
            <span className="text-gray-400 font-bold text-lg">상품 이미지 준비 중</span>
          </div>

          <div className="md:w-1/2 p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  item.status === 'BIDDING' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.status === 'BIDDING' ? '경매 진행 중' : '경매 종료'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                {item.description || "이 상품에 대한 상세 설명이 없습니다."}
              </p>

              {/* 가격 및 시간 정보 섹션 */}
              <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="text-sm font-medium">경매 시작가</span>
                  <span className="font-semibold">{item.startPrice?.toLocaleString()}원</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-bold">
                    {item.status === 'BIDDING' ? '현재 입찰가' : (isUnsold ? '최종 상태' : '최종 낙찰가')}
                  </span>
                  <span className={`text-2xl font-black ${isUnsold ? 'text-red-500' : 'text-blue-600'}`}>
                    {isUnsold ? '유찰되었습니다' : `${item.currentPrice?.toLocaleString()}원`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
                  <span>경매 마감시간</span>
                  <span>{formatDateTime(item.endTime)}</span>
                </div>
              </div>
            </div>

            {item.status === 'BIDDING' ? (
              <form onSubmit={handleBid} className="space-y-4">
                <div className="relative">
                  <input 
                    type="number"
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                    placeholder="입찰 금액을 입력하세요"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <span className="absolute right-5 top-4.5 text-gray-400 font-medium text-lg">원</span>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
                >
                  입찰하기
                </button>
              </form>
            ) : (
              <div className="bg-white p-6 rounded-2xl text-center border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-bold text-lg mb-2">
                  {isUnsold ? '입찰자가 없어 경매가 종료되었습니다.' : '경매가 성공적으로 종료되었습니다.'}
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  다른 경매 상품 보러가기 →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;