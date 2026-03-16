package com.example.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor // 👈 빌더가 작동하려면 필수입니다!
@NoArgsConstructor
public class LoginResponseDto {
    private String accessToken;
    private Long id;
    private String name;
}
