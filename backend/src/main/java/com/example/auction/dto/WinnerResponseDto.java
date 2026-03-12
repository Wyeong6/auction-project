package com.example.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WinnerResponseDto {
    private Long winnerId; // 낙찰자 아이디
    private String winnerName;   // 낙찰자 이름
    private String winnerEmail;  // 낙찰자 이메일
    private int finalPrice;      // 최종 낙찰가
}