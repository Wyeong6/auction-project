package com.example.auction.repository;

import com.example.auction.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // 이미 가입된 이메일인지 확인하기 위해
    Optional<Member> findByEmail(String email);
}