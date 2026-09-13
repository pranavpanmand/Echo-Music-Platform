import React, { useState } from 'react';
import { signup, resendOtp, verifyOtpAndSignup } from '../api/userApi';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'email') setEmail(value);
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await signup(data);
      alert(response.data); // e.g. "OTP sent to email"
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data || 'Signup failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp(email);
      alert(response.data); // e.g. "OTP resent successfully"
    } catch (error) {
      alert(error.response?.data || 'Failed to resend OTP');
    }
  };

  const handleVerifyOtpAndSignup = async () => {
    try {
      const response = await verifyOtpAndSignup({ ...formData, otp });
      alert(response.data); // e.g. "Signup successful"
      // Optional: redirect to login page here
    } catch (error) {
      alert(error.response?.data || 'OTP verification failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Create Account</h2>
      <input
        name="userName"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        name="profileImage"
        type="file"
        onChange={handleChange}
        required
      />

      {/* OTP section only shows after OTP is sent */}
      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="button" onClick={handleVerifyOtpAndSignup}>
            Verify OTP & Signup
          </button>
          <div>
            <p>Didn't receive the OTP?</p>
            <button type="button" onClick={handleResendOtp}>
              Resend OTP
            </button>
          </div>
        </>
      )}

      {/* Only show this button initially */}
      {!otpSent && <button type="submit">Sign Up</button>}
    </form>
  );
}
