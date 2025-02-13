import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Review from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <div>
        <h2>New Review</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailData);
    return res.status(200).json({ message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
}
