import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
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
          <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            경매물건
          </button>

          {!isLoggedIn && (
            <>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600">
                회원가입
              </Link>
              <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                로그인
              </button>
            </>
          )}
          {isLoggedIn && (
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
              마이페이지
            </button>)}
          {/* <div className="h-4 w-[1px] bg-gray-300"></div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;