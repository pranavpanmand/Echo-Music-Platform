package com.echo.app.controller;
// import com.example.otpverification.entity.OtpDetails;
import com.echo.app.entity.OtpDetails;
import com.echo.app.entity.OtpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/otp")

public class OtpController{

    @Autowired
    private JavaMailSender emailSender;

    private ConcurrentHashMap<String, OtpDetails> otpStore = new ConcurrentHashMap<>();

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody OtpRequest otpRequest) {
        String otp = generateOtp();
        try {
            sendOtpEmail(otpRequest.getEmail(), otp);
            otpStore.put(otpRequest.getEmail(), new OtpDetails(otp, System.currentTimeMillis()));
            return "OTP sent to " + otpRequest.getEmail();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send OTP. Please try again later.";
        }
    }
   @PostMapping("/resend")
   public String resendOtp(@RequestBody OtpRequest otpRequest) {
    String newOtp = generateOtp();
    try {
        sendOtpEmail(otpRequest.getEmail(), newOtp);
        otpStore.put(otpRequest.getEmail(), new OtpDetails(newOtp, System.currentTimeMillis()));
        return "OTP resent to " + otpRequest.getEmail();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to resend OTP. Please try again later.";
        }
}




    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody OtpRequest otpRequest, @RequestParam String otp) {
        OtpDetails otpDetails = otpStore.get(otpRequest.getEmail());

        if (otpDetails == null) {
            return "No OTP found for this email.";
        }

        long currentTime = System.currentTimeMillis();
        if (currentTime - otpDetails.getTimestamp() > 10 * 60 * 1000) {
            otpStore.remove(otpRequest.getEmail());
            return "OTP has expired. Please request a new one.";
        }

        if (otpDetails.getOtp().equals(otp)) {
            otpStore.remove(otpRequest.getEmail());
            return "OTP verified successfully!";
        } else {
            return "Invalid OTP. Please try again.";
        }
    }

    private String generateOtp() {
        Random rand = new Random();
        int otp = rand.nextInt(999999);
        return String.format("%06d", otp);
    }

    private void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your OTP Code");
            message.setText("Your OTP code is: " + otp);
            message.setFrom("abhinavneema22@gmail.com");
            emailSender.send(message);
            System.out.println("OTP email successfully sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email to " + toEmail);
            e.printStackTrace();
        }
    }
}
