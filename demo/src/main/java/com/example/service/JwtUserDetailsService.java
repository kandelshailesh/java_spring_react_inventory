package com.example.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.repository.UserRepository;
import com.example.model.Users;


@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Users user_list = userRepo.findByEmail(username);
		
		if (user_list==null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
			return new User(user_list.getEmail(),user_list.getPassword(),new ArrayList<>());
			// return new User(username, "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
			// new ArrayList<>());
		}
	}

}