package com.example.auction.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter // 데이터를 꺼내 쓸 수 있게 Getter를 생성합니다.
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 만듭니다. (JSON 파싱에 필수!)
public class ItemRequestDto {
    private String title;          // 물건 제목
    private String description;    // 물건 설명
    private int startPrice;        // 경매 시작가
    private int durationHours;     // 경매 진행 시간 (몇 시간 동안 진행할지)
}