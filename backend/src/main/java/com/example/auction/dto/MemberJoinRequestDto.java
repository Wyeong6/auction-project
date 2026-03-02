package com.example.auction.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberJoinRequestDto {
    private String email;
    private String password;
    private String name;
}