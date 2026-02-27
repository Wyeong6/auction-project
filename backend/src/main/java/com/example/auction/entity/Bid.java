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

    // 2. 누가 입찰했는가? (Member와의 연결)
    // 아직 Member 엔티티를 안 만들었으니 일단 주석 처리하거나,
    // 나중에 Member를 만들면 똑같이 @ManyToOne으로 연결할 거예요.
    // private Member bidder;

    @Column(nullable = false)
    private int bidPrice; // 입찰 금액

    @Column(nullable = false)
    private LocalDateTime bidTime; // 입찰 시간
}