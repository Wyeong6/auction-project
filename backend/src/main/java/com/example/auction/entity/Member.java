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

    @Enumerated(EnumType.STRING) // DB 저장 시 'USER'나 'ADMIN' 같은 문자열로 저장되게 함
    @Column(nullable = false)
    private Role role = Role.USER; // 기본값은 일반 유저로 설정
}