package com.example.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.example.model.Users;
import com.example.repository.UserRepository;

@RestController
@CrossOrigin()
public class UserController {

    @Autowired
    UserRepository userrepo;

    @PostMapping("/user")
    public ResponseEntity<?> persist(@RequestBody final Users user) {
        try{
        userrepo.save(user); 
        JSONObject entity = new JSONObject();
        entity.put("success", "yes");   
        return new ResponseEntity<JSONObject>(entity,HttpStatus.OK);
        }
        catch(IllegalArgumentException e)
        {
            JSONObject entity = new JSONObject();
            entity.put("success", "no");   
            return new ResponseEntity<JSONObject>(entity,HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/user")
    public List<Users> findall() {
        return userrepo.findAll();
    }

    @GetMapping("user/{id}")
    public Optional<Users> findOne(@PathVariable final Long id)
    {
        return userrepo.findById(id);
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        try
        {
        userrepo.deleteById(id);
        JSONObject entity = new JSONObject();
        entity.put("success", "yes");   
        return new ResponseEntity<JSONObject>(entity,HttpStatus.OK);
        }
        catch(IllegalArgumentException e)
        {
            JSONObject entity = new JSONObject();
        entity.put("success", "no");   
            return new ResponseEntity<JSONObject>(entity,HttpStatus.NOT_FOUND);
        }
    }

}
