package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Branch;

@Transactional
public interface BranchRepository extends JpaRepository<Branch,Long> {
    
    @Query("from Branch where branchid=:branchid")
    public Branch findByBranchid(@Param("branchid") Long branchid);

    @Query("update Branch set branchname=:branchname,branchaddress=:branchaddress,branchphone=:branchphone where id=:id")
    @Modifying
    public Integer updateBranch(@Param("id") Long branchid,@Param("branchaddress") String branchaddress,@Param("branchname") String branchname,@Param("branchphone") String branchphone);


}