// Send OTP to the cp number provided by clicking the button
document.getElementById("sendSMS").addEventListener("click", async function () {
  const contactNumber = '+63' + document.getElementById("contactNumber").value;
  
  // Send OTP to the entered phone number using AJAX
  try {
    const response = await fetch("/check-out-routes/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNumber }),
    });
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error sending OTP:", error);
    alert("Failed to send OTP.");
  }
}); 

// Verifying OTP
document.getElementById("verifyOTP").addEventListener("click", async function () {
  const OTP = document.getElementById("OTP").value;

  // Verify OTP using AJAX
  try {
    const response = await fetch("/check-out-routes/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ OTP }),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    alert("OTP does not match.");
  }
}); 