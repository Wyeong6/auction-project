package com.example.auction.controller;

import com.example.auction.dto.LoginResponseDto;
import com.example.auction.dto.MemberJoinRequestDto;
import com.example.auction.dto.MemberLoginRequestDto;
import com.example.auction.entity.Member;
import com.example.auction.service.MemberService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public String join(@RequestBody MemberJoinRequestDto requestDto) {
        memberService.join(requestDto);
        return "회원가입이 완료되었습니다.";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto requestDto) {
        // 서비스에서 로그인 로직(아이디/비번 검증) 후 토큰을 생성한다고 가정합니다.
        String token = memberService.login(requestDto.getEmail(), requestDto.getPassword());

        // 2. 토큰 생성에 성공했다면, 이메일로 회원 정보를 가져옵니다.
        // (memberService에 findByEmail 같은 메서드가 있다고 가정)
        Member member = memberService.findByEmail(requestDto.getEmail());

        // 3. DTO에 담아서 응답 (이제 리액트에서 undefined가 안 뜹니다!)
        return ResponseEntity.ok(LoginResponseDto.builder()
                .accessToken(token)
                .id(member.getId())
                .name(member.getName())
                .build());
    }

}