package com.echo.app.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echo.app.entity.User;
import com.echo.app.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(ObjectId id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void deleteById(ObjectId id) {
        userRepository.deleteById(id);
    }
    
    public List<User> findByIsArtistTrueAndUserNameContainingIgnoreCase(String keyword) {
        return userRepository.findByIsArtistTrueAndUserNameContainingIgnoreCase(keyword);
    }


}
