package com.example.auction.service;

import com.example.auction.dto.ItemRequestDto;
import com.example.auction.dto.ItemResponseDto;
import com.example.auction.dto.WinnerResponseDto;
import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Item;
import com.example.auction.entity.Member;
import com.example.auction.repository.BidRepository;
import com.example.auction.repository.ItemRepository;
import com.example.auction.repository.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final BidRepository bidRepository;

    /**
     * 경매 물건 등록
     */
    @Transactional
    public Long createItem(ItemRequestDto requestDto) {

        Member seller = memberRepository.findById(requestDto.getSellerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 현재 시간을 기준으로 마감 시간 계산 (예: 입력받은 시간만큼 더하기)
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusMinutes(requestDto.getDurationMinutes());

        Item item = Item.builder()
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .startPrice(requestDto.getStartPrice())
                .currentPrice(requestDto.getStartPrice()) // 초기 현재가는 시작가와 동일
                .startTime(startTime)
                .endTime(endTime)
                .status(AuctionStatus.BIDDING) // 등록 시 기본 상태는 '입찰중'
                .seller(seller)
                .build();

        return itemRepository.save(item).getId();
    }

    /**
     * 경매 물건 전체 목록 조회
     */
    @Transactional(readOnly = true) // 조회 전용 성능 최적화
    public List<ItemResponseDto> getAllItems() {
        return itemRepository.findAll().stream()
                .map(item -> new ItemResponseDto(item, null)) // Entity를 DTO로 변환
                .collect(Collectors.toList());
    }

    /**
     * 특정 경매 물건 상세 조회
     */
    @Transactional(readOnly = true)
    public ItemResponseDto getItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 물건이 존재하지 않습니다. id=" + id));

        // 1. 최고 입찰자 정보를 가져옵니다.
        String bidderName = bidRepository.findTopByItemIdOrderByBidPriceDesc(id)
                .map(bid -> bid.getBidder().getName()) // 입찰자가 있으면 그 사람의 이름을 추출
                .orElse("입찰자 없음"); // 입찰 기록이 없으면 "입찰자 없음"으로 설정

        // 2. 이제 두 개의 값을 생성자에 넣어줍니다.
        return new ItemResponseDto(item, bidderName); // 빨간 줄이 사라집니다!
    }
    /**
     * 특정 경매 물건의 낙찰자 조회 🏆 (유찰 대응 버전)
     */
    @Transactional(readOnly = true)
    public WinnerResponseDto getWinner(Long id) {
        // 1. 물건 존재 확인
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 물건이 존재하지 않습니다. id=" + id));

        // 2. 경매가 종료 상태인지 확인
        if (item.getStatus() != AuctionStatus.ENDED) {
            throw new IllegalStateException("아직 경매가 진행 중입니다.");
        }

        // 3. 입찰 기록 조회 및 결과 반환
        return bidRepository.findFirstByItemOrderByBidPriceDesc(item)
                .map(bid -> new WinnerResponseDto(
                        bid.getBidder().getId(),
                        bid.getBidder().getName(),
                        bid.getBidder().getEmail(),
                        bid.getBidPrice()
                ))
                // 입찰자가 없을 경우(유찰) 빈 정보가 담긴 DTO 반환
                .orElse(new WinnerResponseDto(null,"낙찰자 없음", "-", 0));
    }

}