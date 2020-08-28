package com.example;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.repository.UserRepository;
import com.example.model.Users;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import java.util.List;
import java.util.Optional;

@EnableJpaRepositories("com.example.repository")
@SpringBootApplication
@EntityScan("com.example")
@RestController
public class DemoApplication {

@Autowired
UserRepository usersRepository;
public static void main(final String[] args) {
	


	SpringApplication.run(DemoApplication.class, args);

}

@Autowired 
PasswordEncoder bcryptencoder;
@GetMapping("hellos")
public String hello(@RequestParam(value = "name", defaultValue = "World") final String name) {
	JSONArray array1= new JSONArray();
	JSONObject obj= new JSONObject();
	array1.add(12);
	array1.add(15);
	obj.put("name","shailesh");
	obj.put("id",123);
	  return obj.toJSONString();
	
}


// @GetMapping("/users")
// public List<Users> getAll()
// {
// 	return usersRepository.findAll();
// }

// @GetMapping("/users/{id}")
// public Optional<Users> getOne(@PathVariable Long id)
// {
// 	return usersRepository.findById(id);
// }
// @PostMapping("/users")
// public List<Users> persist(@RequestBody final Users users)
// {
// 	users.setPassword(bcryptencoder.encode(users.getPassword()));
// 	usersRepository.save(users);
//     return usersRepository.findAll();
// }

@RequestMapping("/")
public String index()
{
	return "index.html";
}

}
