package com.example.auction.service;

import com.example.auction.dto.BidRequestDto;
import com.example.auction.entity.AuctionStatus;
import com.example.auction.entity.Bid;
import com.example.auction.entity.Item;
import com.example.auction.entity.Member;
import com.example.auction.repository.BidRepository;
import com.example.auction.repository.ItemRepository;
import com.example.auction.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BidService {
    private final ItemRepository itemRepository;
    private final BidRepository bidRepository;
    private final MemberRepository memberRepository;


    //입찰 로직
    @Transactional
    public void placeBid(BidRequestDto requestDto) {
        Item item = itemRepository.findById(requestDto.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("물건을 찾을 수 없습니다."));

        Member bidder = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (item.getSeller().getId().equals(bidder.getId())) {
            throw new IllegalStateException("본인이 등록한 물건에는 입찰할 수 없습니다.");
        }

        if (item.getStatus() != AuctionStatus.BIDDING || item.getEndTime().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("입찰 가능한 상태가 아닙니다.");
        }

        item.updatePrice(requestDto.getBidPrice());

        Bid bid = Bid.builder()
                .item(item)
                .bidder(bidder) // 입찰자 정보 저장
                .bidPrice(requestDto.getBidPrice())
                .bidTime(LocalDateTime.now())
                .build();

        bidRepository.save(bid);
    }
}