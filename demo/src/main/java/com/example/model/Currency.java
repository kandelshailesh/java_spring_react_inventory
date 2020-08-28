package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Currency {
    
    @Id @GeneratedValue
    private Long id;

    private String currency;
    private String abbreviation;

    public Currency(String currency, String abbreviation) {
        this.currency = currency;
        this.abbreviation = abbreviation;
    }

    public Currency() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public Currency(Long id, String currency, String abbreviation) {
        this.id = id;
        this.currency = currency;
        this.abbreviation = abbreviation;
    }
    
    
}