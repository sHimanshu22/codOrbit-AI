const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetOtpEmail = async (
  email,
  otp
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject:
      "CodOrbit Password Reset OTP",

    html: `
      <div style="font-family: Arial; padding:20px;">
        <h2>CodOrbit AI</h2>

        <p>Your password reset OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP is valid for 10 minutes.
        </p>

        <p>
          If you didn't request this,
          please ignore this email.
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendResetOtpEmail,
};