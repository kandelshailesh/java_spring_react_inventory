package com.example.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.example.model.Rate;
import com.example.repository.RateRepository;

@RestController
@CrossOrigin()
public class RateController {

    @Autowired
    RateRepository raterepo;

    @PostMapping("rate")
    public ResponseEntity<?> persist(@RequestBody final Rate rate) {
        try
        {
        raterepo.save(rate);
        JSONObject entity = new JSONObject();
        entity.put("success","yes");  
         return new ResponseEntity<JSONObject>(entity,HttpStatus.OK);
        }
        catch(IllegalArgumentException e)
        {
            JSONObject entity = new JSONObject();
            entity.put("success", "no");  
             return new ResponseEntity<JSONObject>(entity,HttpStatus.UNAUTHORIZED);
        }
    
    }

    @GetMapping("rate/{id}")
    public List<Rate> findall() {
        return raterepo.findAll();
    }

    // @GetMapping("rate/{id}")
    // public Optional<Rate> findOne(@PathVariable final Long id)
    // {
    //     return raterepo.findById(id);
    // }

    @DeleteMapping("rate/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        try
        {
        raterepo.deleteById(id);
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
