import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import "./Features.css";
import musicAnimation from "../../assets/animations/musicAnimation.json";
import { useNavigate } from "react-router";

const features = [
  {
    title: "Seamless Streaming",
    description: "Enjoy uninterrupted, high-quality music streaming tailored to your taste.",
    icon: "🎵",
  },
  {
    title: "Personalized Playlists",
    description: "Smart AI recommends and curates playlists based on your mood and listening habits.",
    icon: "🎶",
  },
  {
    title: "Discover New Artists",
    description: "Explore emerging talents and underground music scenes you won’t find elsewhere.",
    icon: "🎤",
  },
  {
    title: "Offline Mode",
    description: "Download your favorite tracks and listen without internet.",
    icon: "📥",
  },
  {
    title: "High Fidelity Audio",
    description: "Experience music in crystal-clear, lossless quality.",
    icon: "🎧",
  },
  {
    title: "Social Sharing",
    description: "Share your playlists and favorites with friends instantly.",
    icon: "📱",
  },
  {
    title: "Live Radio & Events",
    description: "Tune into exclusive radio stations and live virtual concerts from your favorite artists.",
    icon: "📻",
  },
  {
    title: "Mood-Based Recommendations",
    description: "Get music suggestions that match your current vibe, from chill to energetic.",
    icon: "🧠",
  }
];

const faqs = [
  {
    question: "Is the music streaming really free?",
    answer: "Yes, we offer a free tier with ads. Premium plans are ad-free and offer additional features.",
  },
  {
    question: "Can I use it offline?",
    answer: "Absolutely. With a premium plan, you can download tracks and listen offline.",
  },
  {
    question: "Do you support different languages?",
    answer: "Yes, we support multiple languages. You can choose your preferred language in settings.",
  },
  {
    question: "How can I create a personalized playlist?",
    answer: "Our AI suggests playlists based on your mood and listening history. You can also create your own.",
  },
];

const FeaturesPage = () => {
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  useEffect(() => {
    // Fetch reviews from backend
    axios.get("http://localhost:8080/reviews")
      .then(response => setReviews(response.data))
      .catch(error => console.error("Failed to fetch reviews:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div className="features-page">
      <header className="features-header">
        <div className="lottie-wrapper">
          <Lottie animationData={musicAnimation} loop={true} />
        </div>
        <h1>Our Features</h1>
        <p>Elevating your music experience with powerful tools and curated services.</p>
      </header>

      <section className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-glass-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="highlight-cta">
        <h2>Ready to Tune Into the Future?</h2>
        <p>Join thousands already vibing on our platform.</p>
        <button className="glow-button" onClick={() => navigate('/')}>Get Started</button>
      </section>

      {reviews.length > 0 && (
        <section className="review-carousel">
          <h2>What Our Users Say</h2>
          <div className="carousel-wrapper">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div className="carousel-slide" key={index}>
                  <p className="review-text">“{review.message}”</p>
                  <p className="review-author">— {review.username}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </section>
      )}

      <section className="faqs-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openFAQIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <span>{openFAQIndex === index ? "−" : "+"}</span>
            </div>
            {openFAQIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default FeaturesPage;
