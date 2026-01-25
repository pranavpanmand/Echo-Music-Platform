import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import "./LoginSignup.css";

const USER_BASE_URL = "http://localhost:8080/user";
const OTP_BASE_URL = "http://localhost:8080/otp";

export default function LoginSignup() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
    });
    setSignupOtp("");
    setSignupOtpSent(false);
  };

  const toggleForm = (toLogin) => {
    setIsLogin(toLogin);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const sendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email before requesting OTP.");
      return;
    }

    try {
      setOtpLoading(true);
      await axios.post(`${OTP_BASE_URL}/send-otp`, { email: formData.email });
      alert("OTP sent to your email.");
      setSignupOtpSent(true);
    } catch (error) {
      alert("Failed to send OTP: " + (error.response?.data || error.message));
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email before requesting OTP.");
      return;
    }

    try {
      setOtpLoading(true);
      await axios.post(`${OTP_BASE_URL}/resend`, { email: formData.email });
      alert("OTP resent to your email.");
      setSignupOtpSent(true);
    } catch (error) {
      const errorMsg =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.message;
      alert("Failed to resend OTP: " + errorMsg);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formLoading) return;

    if (isLogin) {
      // Login flow
      try {
        setFormLoading(true);
        const response = await axios.post(`${USER_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        setUser(response.data);
        navigate("/home");
      } catch (error) {
        alert("Login error: " + (error.response?.data || error.message));
      } finally {
        setFormLoading(false);
      }
    } else {
      // Signup flow
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        setFormLoading(true);
        if (!signupOtpSent) {
          await sendOtp();
        } else {
          const verifyRes = await axios.post(
            `${OTP_BASE_URL}/verify-otp?otp=${signupOtp}`,
            { email: formData.email }
          );

          const otpVerified =
            verifyRes.data === "OTP verified successfully!" ||
            verifyRes.data?.status === "success";

          if (otpVerified) {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (formData.profilePic) {
              data.append("profilePic", formData.profilePic);
            }

            const response = await axios.post(
              `${USER_BASE_URL}/create`,
              data,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            setUser(response.data);
            navigate("/home");
          } else {
            alert("Invalid OTP.");
          }
        }
      } catch (error) {
        alert("Signup error: " + (error.response?.data || error.message));
      } finally {
        setFormLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => toggleForm(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => toggleForm(false)}
          >
            Signup
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <h2>Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={formLoading}>
                {formLoading ? "Logging in..." : "Login"}
              </button>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
              <small>Optional: Upload a profile picture</small>

              {signupOtpSent && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={signupOtp}
                    onChange={(e) => setSignupOtp(e.target.value)}
                    required
                  />
                  <button type="button" onClick={resendOtp} disabled={otpLoading}>
                    {otpLoading ? "Resending..." : "Resend OTP"}
                  </button>
                </>
              )}

              <button type="submit" disabled={otpLoading || formLoading}>
                {formLoading
                  ? "Processing..."
                  : signupOtpSent
                  ? "Verify OTP & Signup"
                  : otpLoading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
