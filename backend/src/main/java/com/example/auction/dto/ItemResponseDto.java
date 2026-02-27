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
    private final LocalDateTime endTime;
    private final AuctionStatus status;

    // 엔티티를 DTO로 변환해주는 생성자
    public ItemResponseDto(Item item) {
        this.id = item.getId();
        this.title = item.getTitle();
        this.description = item.getDescription();
        this.currentPrice = item.getCurrentPrice();
        this.endTime = item.getEndTime();
        this.status = item.getStatus();
    }
}