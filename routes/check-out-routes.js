const twilio = require('twilio');
const dotenv = require('dotenv');
var express = require('express');
var router = express.Router();

dotenv.config();

// client twilio
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate 4 digits OTP
function generateOTP() {
  // Generate 4 digits OTP
  let digits = '0123456789';
  let OTP = '';
  let len = digits.length;
  for(i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }

  return OTP;
}

// Route to handle OTP sending
router.post('/send-otp', async (req, res) => {
  const { contactNumber } = req.body;
  const otp = generateOTP();
 
  try {
    // Send OTP message
    await client.messages.create({
      body: `Sent from Amazon PH, your OTP: ${otp}`,
      from: process.env.MY_TWILIO_PHONE_NUMBER,
      to: contactNumber,
    });

    // Save OTP to session or temporary storage for later verification
    req.session.otp = otp;

    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});


//  Route to handle OTP verification
router.post('/verify-otp', (req,res) => {
  const {OTP} = req.body;

  if(req.session.otp === OTP) {
    res.json({ message: "OTP verified successfully." });

    // Clear OTP from session if verified
    delete req.session.otp;
  } else {
    res.status(400).json({ message: "Invalid OTP." });
  }
}); 


router.get('/check-out', (req, res) => {
  // if the user did not logged in but proceeds to check-out
  if(!req.session.user) {
    return res.redirect('/sign-in-sign-up');
  }

  res.render('check-out', { user: req.session.user }); // render if logged in
});


router.post('/', (req, res) => {
  // if the user is not logged in but proceeds to check-out
  if(!req.session.user) {
    return res.redirect('/sign-in-sign-up');
  }

  try {
    // Array to store product details as details
    const productDetails = []; 

    Object.keys(req.body).forEach((key) => {
      if(key.startsWith('product_name_')) {
        let index = key.split('_')[2]; // Index based on key structure
        
        // Collect product properties as object
        let details = {
          productName: req.body[`product_name_${index}`],
          productDescription: req.body[`product_description_${index}`],
          productRating: req.body[`product_rating_${index}`],
          productCategory: req.body[`product_category_${index}`],
          productColor: req.body[`product_color_${index}`],
          productSize: req.body[`product_size_${index}`],
          productPrice: req.body[`product_price_${index}`],
          productImage: req.body[`product_image_${index}`],
        };

        // Store product details objects to the array
        productDetails.push(details);

        // save to session
        req.session.orderedProducts = details;
      }
    });

    // pass data inputs to session
    const {recipientName, secondaryRecipientName,
            contactNumber, OTP, 
            street, barangay,
            city, province,
            zipCode, cardNumber,
            cardDetails, CCV
    } = req.body;

    if(req.session.otp && req.session.otp === OTP) {
      // save to new session
      req.session.recipientInformation = {
        recipientName,secondaryRecipientName,
        contactNumber, OTP, street, barangay,
        city, province,
        zipCode, cardNumber,
        cardDetails, CCV
      }

      // redirect to recepient page
      return res.redirect('/recipient-routes');
    }

    res.render('check-out', { user: req.session.user,
                              productDetails });
  }
  catch(error) {
    console.log('Error retrieving data', error);
    res.status(500).send('Error retrieving data');
  }
});


module.exports = router;
  