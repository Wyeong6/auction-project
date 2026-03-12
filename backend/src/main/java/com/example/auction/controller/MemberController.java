package com.example.auction.controller;

import com.example.auction.dto.MemberJoinRequestDto;
import com.example.auction.dto.MemberLoginRequestDto;
import com.example.auction.service.MemberService;
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

        // 리액트가 사용할 수 있게 JSON 형태로 토큰을 반환합니다.
        Map<String, String> response = new HashMap<>();
        response.put("accessToken", token);

        return ResponseEntity.ok(response);
    }

}