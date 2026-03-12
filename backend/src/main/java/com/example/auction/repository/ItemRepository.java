package com.example.auction.repository;

import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // 특정 상태이면서 마감 시간이 현재보다 이전인 물건 찾기
    List<Item> findAllByStatusAndEndTimeBefore(AuctionStatus status, LocalDateTime now);
}