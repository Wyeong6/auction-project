package com.example.auction.service;

import com.example.auction.dto.ItemRequestDto;
import com.example.auction.dto.ItemResponseDto;
import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Item;
import com.example.auction.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    /**
     * 경매 물건 등록
     */
    @Transactional
    public Long createItem(ItemRequestDto requestDto) {
        // 현재 시간을 기준으로 마감 시간 계산 (예: 입력받은 시간만큼 더하기)
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusHours(requestDto.getDurationHours());

        Item item = Item.builder()
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .startPrice(requestDto.getStartPrice())
                .currentPrice(requestDto.getStartPrice()) // 초기 현재가는 시작가와 동일
                .startTime(startTime)
                .endTime(endTime)
                .status(AuctionStatus.BIDDING) // 등록 시 기본 상태는 '입찰중'
                .build();

        return itemRepository.save(item).getId();
    }

    /**
     * 경매 물건 전체 목록 조회
     */
    @Transactional(readOnly = true) // 조회 전용 성능 최적화
    public List<ItemResponseDto> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemResponseDto::new) // Entity를 DTO로 변환
                .collect(Collectors.toList());
    }

    /**
     * 특정 경매 물건 상세 조회
     */
    @Transactional(readOnly = true)
    public ItemResponseDto getItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 물건이 존재하지 않습니다. id=" + id));

        return new ItemResponseDto(item);
    }
}