package com.echo.app.service;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echo.app.entity.UserQuery;
import com.echo.app.repository.UserQueryRepository;

@Service
public class UserQueryService {

    @Autowired
    private UserQueryRepository userQueryRepository;

    public Optional<UserQuery> getQueryById(ObjectId  id){
        return userQueryRepository.findById(id);
    }

    public void saveQuery(UserQuery query){
        userQueryRepository.save(query);
    }

    public void deleteQuery(ObjectId id){
        userQueryRepository.deleteById(id);
    }

}
