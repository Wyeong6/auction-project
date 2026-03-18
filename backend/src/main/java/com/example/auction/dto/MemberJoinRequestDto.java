package com.example.auction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberJoinRequestDto {
    private String email;
    private String password;
    private String name;
    @JsonProperty("isAdmin")
    private boolean isAdmin;
}