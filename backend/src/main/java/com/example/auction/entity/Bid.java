package com.example.auction.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. 어떤 물건에 입찰했는가? (Item과의 연결)
    @ManyToOne(fetch = FetchType.LAZY) // 여러 개의 입찰은 하나의 물건에 속함
    @JoinColumn(name = "item_id") // DB 외래키(FK) 컬럼명
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member bidder;

    @Column(nullable = false)
    private int bidPrice; // 입찰 금액

    @Column(nullable = false)
    private LocalDateTime bidTime; // 입찰 시간
}