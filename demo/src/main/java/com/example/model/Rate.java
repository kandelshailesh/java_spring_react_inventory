package com.example.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Rate {
    
    @Id @GeneratedValue
    private Long id;

    Integer currency_id;

    Integer branch_id;

    BigDecimal amount;
    Date storeDate;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCurrency_id() {
        return currency_id;
    }

    public void setCurrency_id(Integer currency_id) {
        this.currency_id = currency_id;
    }

    public Integer getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(Integer branch_id) {
        this.branch_id = branch_id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getStoreDate() {
        return storeDate;
    }

    public void setStoreDate(Date storeDate) {
        this.storeDate = storeDate;
    }

    public Rate(Integer currency_id, Integer branch_id, BigDecimal amount, Date storeDate) {
        this.currency_id = currency_id;
        this.branch_id = branch_id;
        this.amount = amount;
        this.storeDate = storeDate;
    }

    public Rate()
    {
        
    }
    
}