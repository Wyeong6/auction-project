package com.example.auction.service;

import com.example.auction.dto.MemberJoinRequestDto;
import com.example.auction.entity.Member;
import com.example.auction.repository.MemberRepository;
import com.example.auction.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider; // 👈 주입

    @Transactional
    public Long join(MemberJoinRequestDto requestDto) {
        // 1. 중복 회원 검증
        memberRepository.findByEmail(requestDto.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        // 2. 회원 엔티티 생성 및 저장
        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(encodedPassword)
                .name(requestDto.getName())
                .build();

        return memberRepository.save(member).getId();
    }

    public String login(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 👈 진짜 토큰 생성 및 반환
        return jwtTokenProvider.createToken(member.getEmail());
    }
}
