// hide form
function showStep(step) {
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('step1-tab').classList.remove('active');
  document.getElementById('step2-tab').classList.remove('active');
  document.getElementById('step3-tab').classList.remove('active');
  
  document.getElementById('step' + step).classList.remove('hidden');
  document.getElementById('step' + step + '-tab').classList.add('active');
}


// Disable sms button if not len === 11
const sendSMSButton = document.getElementById("sendSMS");
const contactInput = document.getElementById("contactNumber");

function isContactNumberValid() {
  const inputValue = contactInput.value;

  const isValid = inputValue.length === 11;

  if(isValid) {
    sendSMSButton.removeAttribute('disabled');
    
    sendSMSButton.style.border = "none";
    sendSMSButton.style.backgroundColor = "#f0a047";
    sendSMSButton.style.fontWeight = "600";
    sendSMSButton.style.pointerEvents = "all";
  }
  else {
    sendSMSButton.setAttribute('disabled', true);
    sendSMSButton.style.backgroundColor = "#efefef";
    sendSMSButton.style.border = "4px solid #ffff";
  }
}

contactInput.addEventListener("input", isContactNumberValid);

// Disable verify otp button if not len === 4
const verifyOTPButton = document.getElementById("verifyOTP");
const otpInput = document.getElementById("OTP");

function isOTPValid() {
  const inputValue = otpInput.value;

  const isValid = inputValue.length === 4;

  if(isValid) {
    verifyOTPButton.removeAttribute('disabled');
    
    verifyOTPButton.style.border = "none";
    verifyOTPButton.style.backgroundColor = "#f0a047";
    verifyOTPButton.style.fontWeight = "600";
    verifyOTPButton.style.pointerEvents = "all";
    verifyOTPButton.style.width = "6.2rem";
  }
  else {
    verifyOTPButton.setAttribute('disabled', true);
    verifyOTPButton.style.backgroundColor = "#efefef";
    verifyOTPButton.style.border = "4px solid #ffff";
  }
}

otpInput.addEventListener("input", isOTPValid);


// // Disable next button if not completed the form
const nextButton1 = document.getElementById("button1");
const inputFields1 = document.querySelectorAll('.input1');

const nextButton2 = document.getElementById("button2");
const inputFields2 = document.querySelectorAll('.input2');

const nextButton3 = document.getElementById("button3");
const inputFields3 = document.querySelectorAll('.input3');

function checkFormCompletion() {
  let allFieldsFilled1 = true;
  let allFieldsFilled2 = true;
  let allFieldsFilled3 = true;

  inputFields1.forEach(input => {
    if (input.value.trim() === "") {
      allFieldsFilled1 = false;
    }
  });

  inputFields2.forEach(input => {
    if(input.value.trim() === "") {
      allFieldsFilled2 = false;
    }
  });

  inputFields3.forEach(input => {
    if(input.value.trim() === "") {
      allFieldsFilled3 = false;
    }
  })

  // Enable/disable the button based on whether all fields are filled
  nextButton1.disabled = !allFieldsFilled1;
  nextButton2.disabled = !allFieldsFilled2;
  nextButton3.disabled = !allFieldsFilled3
}

// Attach the event listener for each input field to trigger form validation on input
inputFields1.forEach(input => {
  input.addEventListener("input", checkFormCompletion);
});

inputFields2.forEach(input => {
  input.addEventListener("input", checkFormCompletion);
});

inputFields3.forEach(input => {
  input.addEventListener("input", checkFormCompletion);
});
 
