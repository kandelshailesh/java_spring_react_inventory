package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import com.example.model.Inventory;

@Transactional
public interface InventoryRepository extends JpaRepository<Inventory,Long> {

    
    @Query("update Inventory set branch_id=:branch_id,currencytype=:currencytype,amount=:amount where id=:id")
    @Modifying
    public Integer updateInventory(@Param("id") Long id,@Param("branch_id") Long branch_id,@Param("currencytype") Integer currencytype,@Param("amount") BigDecimal amount);
    
    @Query("FROM Inventory where branch_id=:branch_id")
    public List<Inventory> findByBranches(@Param("branch_id") Long branch_id);

	
}