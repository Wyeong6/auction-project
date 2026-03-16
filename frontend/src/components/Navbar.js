import React from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // 저장된 유저 ID도 함께 삭제
    setIsLoggedIn(false);
    navigate('/');
  };

  // 물건 등록 버튼 클릭 로직
  const handleRegisterClick = () => {
    if (isLoggedIn) {
      // 로그인 상태면 등록 페이지로 이동
      navigate('/items/new');
    } else {
      // 로그인 상태가 아니면 알림창 후 로그인 페이지로 이동
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate('/login');
    }
  };


  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 영역 */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Item Auction
          </span>
        </Link>

        {/* 메뉴 영역 */}
        <div className="flex items-center gap-6">
          {/* 물건 등록 버튼 (항상 표시) */}
          <button 
            onClick={handleRegisterClick}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            물건 등록
          </button>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                로그인
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600">
                회원가입
              </Link>
            </>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
              >
                로그아웃
              </button>
              <button 
                onClick={() => navigate('/mypage')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                마이페이지
              </button>
            </div>
          )}
          {/* <div className="h-4 w-[1px] bg-gray-300"></div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;