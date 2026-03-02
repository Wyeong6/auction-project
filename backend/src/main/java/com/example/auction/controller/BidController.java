package com.example.auction.controller;

import com.example.auction.dto.BidRequestDto;
import com.example.auction.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bids")
public class BidController {
    private final BidService bidService;

    @PostMapping
    public String placeBid(@RequestBody BidRequestDto requestDto) {
        bidService.placeBid(requestDto);
        return "입찰 성공! 현재가가 " + requestDto.getBidPrice() + "원으로 갱신되었습니다.";
    }
}