package com.echo.app.entity;

public class OtpRequest {
    private String email;

    public OtpRequest() {
    }

    public OtpRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
