package com.echo.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.echo.app.entity.Review;
import com.echo.app.repository.ReviewRepository;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*") // Allow frontend access
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

   @GetMapping
public List<Review> getAllReviews() {
    System.out.println("Fetching all reviews...");
    List<Review> reviews = reviewRepository.findAll();
    System.out.println("Fetched: " + reviews.size() + " reviews");
    return reviews;
}


    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }
}
