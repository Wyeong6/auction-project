package com.example.auction.scheduler;

import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Item;
import com.example.auction.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuctionScheduler {

    private final ItemRepository itemRepository;

    // 1분마다 실행 (60000ms)
    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void closeExpiredAuctions() {
        log.info("경매 마감 체크 스케줄러 실행 중...");

        // 현재 시간보다 마감 시간이 이전(과거)인데, 아직 상태가 BIDDING인 것들 찾기
        List<Item> expiredItems = itemRepository.findAllByStatusAndEndTimeBefore(
                AuctionStatus.BIDDING, LocalDateTime.now());

        for (Item item : expiredItems) {
            log.info("경매 종료 처리: {}", item.getTitle());
            item.closeAuction();        }
    }
}