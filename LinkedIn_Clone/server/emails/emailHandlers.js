import { Mailtrapclient, sender } from "../lib/mailtrap.js";

const sendWelcomeEmail = async (name, email, profileUrl) => {
  const recipient = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to our LinkedIn!",
      html: createWelcomeEmailTemplate(name, profileUrl),
      categories: ["welcome"],
    });
    console.log("Welcome email sent successfully:");
    return response;
  } catch (error) {
    throw error;
    console.error("Error sending welcome email:", error);
  }
};
