package com.example.auction.repository;

import com.example.auction.entity.Bid;
import com.example.auction.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {
    // 나중에 특정 물건의 모든 입찰 기록을 시간순으로 가져오는 메서드 등을 추가할 거예요.
    Optional<Bid> findFirstByItemOrderByBidPriceDesc(Item item);
}