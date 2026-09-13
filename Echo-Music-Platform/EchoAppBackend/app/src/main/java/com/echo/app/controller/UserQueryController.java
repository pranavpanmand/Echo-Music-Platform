package com.echo.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.echo.app.entity.UserQuery;
import com.echo.app.service.UserQueryService;

@RestController
@RequestMapping("/userQuery")
public class UserQueryController {

    @Autowired
    private UserQueryService userQueryService;

    @PostMapping("/storeQuery")
    public void saveQuery(
        @RequestParam("name") String name,
        @RequestParam("email") String email,
        @RequestParam("message") String message
    ){
        UserQuery query = new UserQuery();
        query.setUserName(name);
        query.setMessage(message);
        query.setEmail(email);
        userQueryService.saveQuery(query);
    }

}
