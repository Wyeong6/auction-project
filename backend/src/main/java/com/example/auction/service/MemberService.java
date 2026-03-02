package com.example.auction.service;

import com.example.auction.dto.MemberJoinRequestDto;
import com.example.auction.entity.Member;
import com.example.auction.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long join(MemberJoinRequestDto requestDto) {
        // 1. 중복 회원 검증
        memberRepository.findByEmail(requestDto.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        // 2. 회원 엔티티 생성 및 저장
        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(requestDto.getPassword()) // 실제 서비스에선 암호화가 필수입니다!
                .name(requestDto.getName())
                .build();

        return memberRepository.save(member).getId();
    }
}
