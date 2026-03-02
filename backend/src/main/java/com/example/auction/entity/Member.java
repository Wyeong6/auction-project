package com.example.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // 로그인 아이디로 사용

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private String name; // 사용자 이름
}