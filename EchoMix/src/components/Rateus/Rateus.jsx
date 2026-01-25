import React, { useState } from 'react';
import { FaStar, FaRegSmile, FaRegFrown, FaRegMeh } from 'react-icons/fa';
import './Rateus.css';

const RateUs = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating > 0 && name.trim() !== '') {
            try {
                const res = await fetch('http://localhost:8080/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name.trim(),
                        message: feedback.trim(),
                    }),
                });

                if (res.ok) {
                    console.log('Review submitted');
                    setSubmitted(true);
                } else {
                    console.error('Failed to submit review');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        } else {
            alert('Please provide your name and a rating.');
        }
    };

    const resetRating = () => {
        setRating(0);
        setHover(null);
        setSubmitted(false);
        setFeedback('');
        setName('');
    };

    const getEmoji = () => {
        if (rating <= 2) return <FaRegFrown className="emoji" />;
        if (rating === 3) return <FaRegMeh className="emoji" />;
        return <FaRegSmile className="emoji" />;
    };

    if (submitted) {
        return (
            <div className="rateus-container submitted">
                <div className="thank-you-message">
                    {getEmoji()}
                    <h2>Thank You, {name}!</h2>
                    <p>We appreciate your {rating}-star rating{feedback && ' and feedback'}!</p>
                    <button onClick={resetRating} className="rate-again-btn">
                        Rate Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rateus-container">
            <div className="rateus-left">
                <h2>Rate Your Experience</h2>
                <p>How would you rate your experience with us?</p>
                <div className="emoji-preview">
                    {rating > 0 ? (
                        <>
                            {getEmoji()}
                            <span>{rating} star{rating > 1 ? 's' : ''}</span>
                        </>
                    ) : (
                        <p>Select your rating</p>
                    )}
                </div>
            </div>

            <div className="rateus-right">
                <form onSubmit={handleSubmit}>
                    <div className="stars">
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    <FaStar
                                        className="star"
                                        color={currentRating <= (hover || rating) ? '#cd7f32' : '#e0d6c9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                        size={30}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    {/* 👇 Name Input Section */}
                    <div className="name-section">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="feedback-section">
                        <label htmlFor="feedback">Your feedback (optional)</label>
                        <textarea
                            id="feedback"
                            placeholder="What did you enjoy or what could we improve?"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={rating === 0}
                    >
                        Submit Rating
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RateUs;
