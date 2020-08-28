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

import com.example.model.Branch;
import com.example.repository.BranchRepository;

@RestController
@CrossOrigin()
public class BranchController {

    @Autowired
    BranchRepository branchrepo;

    @PostMapping("branch")
    public ResponseEntity<?> persist(@RequestBody final Branch branch) {
        try
        {
        branchrepo.save(branch);
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

    @GetMapping("branch")
    public List<Branch> findall() {
        return branchrepo.findAll();
    }

    @GetMapping("branch/{id}")
    public Optional<Branch> findOne(@PathVariable final Long id)
    {
        return branchrepo.findById(id);
    }

    @DeleteMapping("branch/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        try
        {
        branchrepo.deleteById(id);
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

    @PutMapping("branch/{id}")
    public ResponseEntity<?> edit(@PathVariable final Long id,@RequestBody final Branch branch)
    {
        Integer branch_data=branchrepo.updateBranch(branch.getId(),branch.getBranchaddress(),branch.getBranchname(),branch.getBranchphone());
        if(branch_data>0)
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
