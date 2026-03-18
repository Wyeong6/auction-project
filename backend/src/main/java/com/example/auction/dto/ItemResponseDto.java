package com.example.auction.dto;

import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Item;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class ItemResponseDto {
    private final Long id;
    private final String title;
    private final String description;
    private final int currentPrice;
    private final int startPrice;    // 추가: 시작가
    private final LocalDateTime startTime; // 추가: 시작 시간 (필요 시)
    private final LocalDateTime endTime;
    private final AuctionStatus status;
    private final Long sellerId;
    private final String sellerName;        // 추가: 판매자 이름
    private final String currentBidderName;  // 추가: 현재 입찰자 이름

    // 엔티티를 DTO로 변환해주는 생성자
    public ItemResponseDto(Item item, String currentBidderName) {
        this.id = item.getId();
        this.title = item.getTitle();
        this.description = item.getDescription();
        this.currentPrice = item.getCurrentPrice();
        this.endTime = item.getEndTime();
        this.status = item.getStatus();
        this.startPrice = item.getStartPrice();
        this.startTime = item.getStartTime();
        // 판매자 정보 추출
        if (item.getSeller() != null) {
            this.sellerId = item.getSeller().getId();
            this.sellerName = item.getSeller().getName(); // 여기서 이름을 가져옵니다!
        } else {
            this.sellerId = null;
            this.sellerName = "알 수 없음";
        }
        // 현재 입찰자 이름 (Service에서 넘겨받음)
        this.currentBidderName = currentBidderName != null ? currentBidderName : "입찰자 없음";
    }
}