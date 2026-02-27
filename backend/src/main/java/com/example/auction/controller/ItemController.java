package com.example.auction.controller;

import com.example.auction.dto.ItemRequestDto;
import com.example.auction.dto.ItemResponseDto;
import com.example.auction.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 1. JSON 형태의 데이터를 주고받는 컨트롤러임을 선언합니다.
@RequiredArgsConstructor // 2. 필드에 선언된 final 객체(Service)를 자동으로 주입해줍니다.
@RequestMapping("/api/items") // 3. 이 클래스 내의 모든 API 주소는 /api/items로 시작합니다.
public class ItemController {

    private final ItemService itemService;

    /**
     * 경매 물건 등록 (POST /api/items)
     */
    @PostMapping
    public String createItem(@RequestBody ItemRequestDto requestDto) {
        Long itemId = itemService.createItem(requestDto);
        return "물건 등록 성공! 생성된 ID: " + itemId;
    }

    /**
     * 경매 물건 전체 목록 조회 (GET /api/items)
     */
    @GetMapping
    public List<ItemResponseDto> getAllItems() {
        // 서비스에서 변환된 DTO 리스트를 반환합니다.
        return itemService.getAllItems();
    }

    /**
     * 특정 경매 물건 상세 조회 (GET /api/items/{id})
     */
    @GetMapping("/{id}")
    public ItemResponseDto getItem(@PathVariable Long id) {
        // 주소창에 들어온 {id} 값을 읽어서 해당 물건의 정보를 반환합니다.
        return itemService.getItem(id);
    }
}