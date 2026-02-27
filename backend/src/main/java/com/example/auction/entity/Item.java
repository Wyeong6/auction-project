package com.example.auction.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity // 1. 이 클래스가 DB 테이블과 매핑되는 객체임을 알려줌
@Getter // 2. Getter 메서드 자동 생성
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 3. 파라미터 없는 기본 생성자 생성
@AllArgsConstructor
@Builder // 4. 객체 생성을 편리하게 해주는 빌더 패턴 적용
public class Item {

    @Id // 5. PK (기본키) 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 6. ID 자동 증가 (Auto Increment)
    private Long id;

    @Column(nullable = false) // 7. DB 컬럼 설정 (NULL 불가)
    private String title;

    @Column(columnDefinition = "TEXT") // 8. 긴 설명글을 위해 TEXT 타입 지정
    private String description;

    private int startPrice; // 경매 시작가

    private int currentPrice; // 현재 최고 입찰가

    private LocalDateTime startTime; // 경매 시작 시간

    private LocalDateTime endTime; // 경매 마감 시간

    @Enumerated(EnumType.STRING) // 9. 이넘(Enum) 타입을 문자열 그대로 DB에 저장
    private AuctionStatus status; // 경매 상태 (예: 진행중, 종료)
}