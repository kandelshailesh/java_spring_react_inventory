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

import com.example.model.Inventory;
import com.example.repository.InventoryRepository;

@RestController
@CrossOrigin()
public class InventoryController {

    @Autowired
    InventoryRepository inventoryrepo;

    @PostMapping("inventory")
    public ResponseEntity<?> persist(@RequestBody final Inventory inventory) {
        try
        {
        inventoryrepo.save(inventory);
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

    @GetMapping("inventory/{id}")
    public List<Inventory> findByBranchs(@PathVariable final Long id) {
        return inventoryrepo.findByBranches(id);
    }

    // @GetMapping("inventory/{id}")
    // public Optional<Inventory> findOne(@PathVariable final Long id)
    // {
    //     return inventoryrepo.findById(id);
    // }

    @DeleteMapping("inventory/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        try
        {
        inventoryrepo.deleteById(id);
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

    @PutMapping("inventory/{id}")
    public ResponseEntity<?> edit(@PathVariable final Long id,@RequestBody final Inventory inventory)
    {
        Integer inventory_data=inventoryrepo.updateInventory(inventory.getId(),inventory.getBranch_id(),inventory.getCurrency_type(),inventory.getAmount());
        if(inventory_data>0)
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
