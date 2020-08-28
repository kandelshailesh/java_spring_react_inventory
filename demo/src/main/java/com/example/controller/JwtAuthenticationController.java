package com.example.controller;

import java.util.List;
import java.util.Objects;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



import com.example.config.JwtTokenUtil;
import com.example.model.JwtRequest;
import com.example.model.JwtResponse;

import com.example.repository.UserRepository;
import com.example.model.Users;
@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@Autowired
	UserRepository usersRepository;

	@Autowired 
	PasswordEncoder bcryptencoder;

	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws Exception {
				System.out.println(authenticationRequest.getUsername()); 
		String result= authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		System.out.println("Hello how are you");
		if(result=="Yes")
		{
		final UserDetails userDetails = jwtInMemoryUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
		}
		else
		{
			JSONObject Entity = new JSONObject();
			Entity.put("message","Username or Password didnot match");
			return new ResponseEntity<JSONObject>(Entity,HttpStatus.UNAUTHORIZED);
		}
	}

	
	private String authenticate(String username, String password) {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

					Users user_list = usersRepository.findByEmail(username);
			System.out.println(user_list);
			Boolean encoded_password = bcryptencoder.matches(password,user_list.getPassword());
		System.out.println(encoded_password);
		

			if(user_list != null)
			{
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			}
			else
			{
				return new String("No");
			}
			return "Yes";
		}
	}