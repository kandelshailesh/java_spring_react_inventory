package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Currency;

@Transactional
public interface CurrencyRepository extends JpaRepository<Currency,Long> {

@Query("update Currency set currency=:currency,abbreviation=:abbreviation where id=:id")
@Modifying
public Integer updateCurrency(@Param("id") Long id,@Param("currency") String currency,@Param("abbreviation") String abbreviation);
}