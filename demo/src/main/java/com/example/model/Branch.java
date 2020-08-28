package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class Branch {

@Column(name="id")
private @Id @GeneratedValue Long id;

@Column(name="branchname")
private String branchname;

@Column(name="branchaddress")
private String branchaddress;

private String branchphone;

public Branch()
{

}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getBranchname() {
    return branchname;
}

public void setBranchname(String branchname) {
    this.branchname = branchname;
}

public String getBranchaddress() {
    return branchaddress;
}

public void setBranchaddress(String branchaddress) {
    this.branchaddress = branchaddress;
}

public String getBranchphone() {
    return branchphone;
}

public void setBranchphone(String branchphone) {
    this.branchphone = branchphone;
}

public Branch(String branchname, String branchaddress, String branchphone) {
    this.branchname = branchname;
    this.branchaddress = branchaddress;
    this.branchphone = branchphone;
}

public Branch(Long id, String branchname, String branchaddress, String branchphone) {
    this.id = id;
    this.branchname = branchname;
    this.branchaddress = branchaddress;
    this.branchphone = branchphone;
}






    
}