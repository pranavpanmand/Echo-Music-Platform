package com.echo.app.entity;

public class OtpDetails {
    private final String otp;
    private final long timestamp;

    public OtpDetails(String otp, long timestamp) {
        this.otp = otp;
        this.timestamp = timestamp;
    }

    public String getOtp() {
        return otp;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
