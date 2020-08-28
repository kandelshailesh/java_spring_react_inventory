package com.example.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Transaction {
    @Column(name="id")
    private @Id @GeneratedValue Long id;
    private String txn_type;
    private Long customer_id;
    private String customer_id_type;
    private String customer_id_url;
    private String forex_currency;
    private BigDecimal forex_amount;
    private BigDecimal cash_amount;
    private String cash_currency;
    private Long branch_id;
    private Long staff_id;
    private Date createdDate;

    public Transaction()
    {
        
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTxn_type() {
        return txn_type;
    }

    public void setTxn_type(String txn_type) {
        this.txn_type = txn_type;
    }

    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public String getCustomer_id_type() {
        return customer_id_type;
    }

    public void setCustomer_id_type(String customer_id_type) {
        this.customer_id_type = customer_id_type;
    }

    public String getCustomer_id_url() {
        return customer_id_url;
    }

    public void setCustomer_id_url(String customer_id_url) {
        this.customer_id_url = customer_id_url;
    }

    public String getForex_currency() {
        return forex_currency;
    }

    public void setForex_currency(String forex_currency) {
        this.forex_currency = forex_currency;
    }

    public BigDecimal getForex_amount() {
        return forex_amount;
    }

    public void setForex_amount(BigDecimal forex_amount) {
        this.forex_amount = forex_amount;
    }

    public BigDecimal getCash_amount() {
        return cash_amount;
    }

    public void setCash_amount(BigDecimal cash_amount) {
        this.cash_amount = cash_amount;
    }

    public String getCash_currency() {
        return cash_currency;
    }

    public void setCash_currency(String cash_currency) {
        this.cash_currency = cash_currency;
    }

    public Long getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(Long branch_id) {
        this.branch_id = branch_id;
    }

    public Long getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(Long staff_id) {
        this.staff_id = staff_id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Transaction(String txn_type, Long customer_id, String customer_id_type, String customer_id_url,
            String forex_currency, BigDecimal forex_amount, BigDecimal cash_amount, String cash_currency,
            Long branch_id, Long staff_id, Date createdDate) {
        this.txn_type = txn_type;
        this.customer_id = customer_id;
        this.customer_id_type = customer_id_type;
        this.customer_id_url = customer_id_url;
        this.forex_currency = forex_currency;
        this.forex_amount = forex_amount;
        this.cash_amount = cash_amount;
        this.cash_currency = cash_currency;
        this.branch_id = branch_id;
        this.staff_id = staff_id;
        this.createdDate = createdDate;
    }


}   