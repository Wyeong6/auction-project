package com.example.auction.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BidRequestDto {
    private Long itemId;   // 입찰할 물건 ID
    private Long memberId; // 누가 입찰하는지 ID 추가
    private int bidPrice;  // 입찰 금액 (bidAmount 대신 bidPrice로 변경)
}