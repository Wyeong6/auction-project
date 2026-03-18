import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/items/${id}`);        
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

    // 1. 로그인 여부 확인
    const memberId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!memberId || !token) {
      alert("입찰을 위해 먼저 로그인해주세요.");
      navigate('/login');
      return;
    }

    // 2. 입력값 검증 (이미 있는 로직)
    if (!bidAmount || Number(bidAmount) <= item.currentPrice) {
      alert("현재가보다 높은 금액을 입력해주세요.");
      return;
    }

    // 3. 백엔드로 보낼 데이터 준비 (포스트맨 테스트했던 그 구조)
    const requestData = {
      itemId: parseInt(id),       // URL에서 가져온 상품 ID
      bidPrice: parseInt(bidAmount), // 사용자가 입력한 입찰 금액
      memberId: parseInt(memberId)  // 로그인 시 저장한 내 ID
    };

    try {
      console.log("전송 토큰:", token);
      await api.post('/api/bids', requestData);
      alert(`${Number(bidAmount).toLocaleString()}원 입찰에 성공했습니다!`);
      
      // 5. 성공 후 화면 갱신: 다시 데이터를 불러와서 현재가를 업데이트합니다.
      const updatedResponse = await axios.get(`http://localhost:8080/api/items/${id}`);
      setItem(updatedResponse.data);
      setBidAmount(''); // 입력창 초기화

    } catch (err) {
      console.error("입찰 실패:", err);
      // 서버에서 보낸 에러 메시지가 있다면 그걸 보여주고, 없으면 기본 메시지 출력
      const errorMsg = err.response?.data?.message || "입찰 처리 중 오류가 발생했습니다.";
      alert(errorMsg);
    }
  };

  if (!item) return <div className="p-10 text-center text-gray-500">상품 정보를 불러오는 중입니다...</div>;

  // 유찰 여부 확인 (현재가가 시작가와 같으면 입찰자가 없는 것으로 판단)
  const isUnsold = item.status === 'ENDED' && item.currentPrice === item.startPrice;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-500 hover:text-gray-800 transition-colors"
        >
          <span className="mr-2">←</span> 목록으로 돌아가기
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* 왼쪽: 이미지 영역 */}
            <div className="md:w-1/2 bg-gray-100 h-[500px] flex items-center justify-center border-r border-gray-50">
              <div className="text-center">
                <div className="text-5xl mb-4">📦</div>
                <span className="text-gray-400 font-bold text-lg">상품 이미지 준비 중</span>
              </div>
            </div>

            {/* 오른쪽: 상세 정보 영역 */}
            <div className="md:w-1/2 p-10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    item.status === 'BIDDING' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.status === 'BIDDING' ? '경매 진행 중' : '경매 종료'}
                  </span>
                </div>

                {/* ✅ 판매자 정보 섹션 */}
                <div className="flex items-center mb-8 text-sm">
                  <span className="text-gray-500 mr-2">판매자</span>
                  <span className="font-bold text-gray-800 bg-blue-50 px-3 py-1 rounded-lg">
                    {item.sellerName || '정보 없음'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-10 leading-relaxed text-lg min-h-[100px]">
                  {item.description || "이 상품에 대한 상세 설명이 없습니다."}
                </p>

                {/* 가격 및 시간 정보 섹션 */}
                <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-medium">경매 시작가</span>
                    <span className="font-semibold">{item.startPrice?.toLocaleString()}원</span>
                  </div>
                  
                  {/* ✅ 현재 최고 입찰자 표시 */}
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-medium">
                      {item.status === 'BIDDING' ? '현재 최고 입찰자' : '최종 낙찰자'}
                    </span>
                    <span className="font-bold text-blue-500">
                      {item.currentBidderName || "아직 입찰자가 없습니다"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-gray-900 font-bold text-lg">
                      {item.status === 'BIDDING' ? '현재 입찰가' : (isUnsold ? '최종 상태' : '최종 낙찰가')}
                    </span>
                    <span className={`text-3xl font-black ${isUnsold ? 'text-red-500' : 'text-blue-600'}`}>
                      {isUnsold ? '유찰되었습니다' : `${item.currentPrice?.toLocaleString()}원`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
                    <span>경매 마감시간</span>
                    <span className="font-medium">{formatDateTime(item.endTime)}</span>
                  </div>
                </div>
              </div>

              {/* 입찰 영역 */}
              {item.status === 'BIDDING' ? (
                <form onSubmit={handleBid} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="number"
                      className="w-full p-5 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none transition-all text-xl font-bold"
                      placeholder="입찰 금액을 입력하세요"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <span className="absolute right-6 top-5 text-gray-400 font-bold text-xl">원</span>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
                  >
                    지금 입찰하기
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
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
    </div>
  );
}

export default ItemDetail;