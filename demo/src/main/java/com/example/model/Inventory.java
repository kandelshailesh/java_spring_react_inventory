package com.example.model;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Inventory {

    private @Id @GeneratedValue Long id;
    
    private Long branch_id;
    private Integer currency_type;
    private BigDecimal amount;
    
    public Inventory(Long branch_id, Integer currency_type, BigDecimal amount) {
        this.branch_id = branch_id;
        this.currency_type = currency_type;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(Long branch_id) {
        this.branch_id = branch_id;
    }

    public Integer getCurrency_type() {
        return currency_type;
    }

    public void setCurrency_type(Integer currency_type) {
        this.currency_type = currency_type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Inventory() {
    }

    

}