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

import com.example.model.Currency;
import com.example.repository.CurrencyRepository;

@RestController
@CrossOrigin()
public class CurrencyController {

    @Autowired
    CurrencyRepository currencyrepo;

    @PostMapping("currency")
    public ResponseEntity<?> persist(@RequestBody final Currency currency) {
        try
        {
        currencyrepo.save(currency);
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

    @GetMapping("currency")
    public List<Currency> findall() {
        return currencyrepo.findAll();
    }

    @GetMapping("currency/{id}")
    public Optional<Currency> findOne(@PathVariable final Long id)
    {
        return currencyrepo.findById(id);
    }

    @DeleteMapping("currency/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        try
        {
        currencyrepo.deleteById(id);
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

    @PostMapping("/currency/{id}")
    public ResponseEntity<?> edit(@PathVariable final Long id,@RequestBody final Currency currency)
    {
        Integer currency_data=currencyrepo.updateCurrency(currency.getId(),currency.getCurrency(),currency.getAbbreviation());
        if(currency_data>0)
        {
        JSONObject entity = new JSONObject();
        entity.put("success", "yes");  
         return new ResponseEntity<JSONObject>(entity,HttpStatus.OK);
        }
        else
        {
            JSONObject entity = new JSONObject();
            entity.put("success", "no");  
             return new ResponseEntity<JSONObject>(entity,HttpStatus.UNAUTHORIZED);   
        }
    }


}
