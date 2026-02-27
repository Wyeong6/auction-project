package com.example.auction.repository;

import com.example.auction.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository를 상속받으면 save(), findById(), findAll() 등을 바로 쓸 수 있다.
public interface ItemRepository extends JpaRepository<Item, Long> {
}