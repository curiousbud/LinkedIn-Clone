import nodemailer from "nodemailer";
import { transporter, sender } from "../lib/emailConfig.js"; 
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";

// Send Welcome Email
export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error("Invalid email address provided:", email);
      throw new Error("Invalid recipient email address");
    }

    console.log("Sending welcome email to:", email);

    const info = await transporter.sendMail({
      from: {
        name: sender.name,
        address: sender.email
      },
      to: email,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
    });

    // Ethereal-specific preview URL
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
    throw error;
  }
};

// Send Comment Notification
export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  try {
    if (!recipientEmail || !recipientEmail.includes("@")) {
      throw new Error("Invalid recipient email address");
    }

    console.log("📩 Sending comment notification email to:", recipientEmail);

    const info = await transporter.sendMail({
      from: {
        name: sender.name,
        address: sender.email
      },
      to: recipientEmail,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
    });

    console.log("✅ Comment notification email preview:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("❌ Error sending comment notification email:", error.message);
    throw error;
  }
};

// Send Connection Accepted Email
export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  try {
    if (!senderEmail || !senderEmail.includes("@")) {
      throw new Error("Invalid sender email address");
    }

    console.log("Sending connection accepted email to:", senderEmail);

    const info = await transporter.sendMail({
      from: {
        name: sender.name,
        address: sender.email
      },
      to: senderEmail,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
    });

    console.log("Connection accepted email preview:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending connection accepted email:", error.message);
    throw error;
  }
};