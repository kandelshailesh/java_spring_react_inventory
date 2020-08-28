package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.example.model.Users;
public interface UserRepository extends JpaRepository<Users,Long> {
    
    @Query("from Users where email=:email and password=:password")
    public List<Users> findByEmailandPassword(@Param("email") String email,@Param("password") String password);

    @Query("from Users where email=:email")
    public Users findByEmail(String email);
}