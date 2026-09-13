package com.echo.app.entity;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class LoginRequest {
    
    private String email;
    private String password;

}
