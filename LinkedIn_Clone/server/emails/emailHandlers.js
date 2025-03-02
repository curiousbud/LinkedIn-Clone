//TODO: Find alternative for mailtrap

import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";

/**
 * Sends a welcome email to a new user.
 * @param {string} email - The recipient's email address.
 * @param {string} name - The recipient's name.
 * @param {string} profileUrl - The URL to the user's profile.
 */
export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    // Validate email format before sending
    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error("Invalid email address provided:", email);
      throw new Error("Invalid recipient email address");
    }

    console.log("Sending welcome email to:", email);

    const recipient = [{ email }];

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
    throw error;
  }
};

/**
 * Sends a comment notification email.
 * @param {string} recipientEmail - Email of the person receiving the notification.
 * @param {string} recipientName - Name of the recipient.
 * @param {string} commenterName - Name of the commenter.
 * @param {string} postUrl - Link to the commented post.
 * @param {string} commentContent - The comment text.
 */
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

    const recipient = [{ email: recipientEmail }];

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
    });

    console.log("✅ Comment notification email sent successfully:", response);
  } catch (error) {
    console.error(
      "❌ Error sending comment notification email:",
      error.message
    );
    throw error;
  }
};

/**
 * Sends an email when a connection request is accepted.
 * @param {string} senderEmail - Email of the person who sent the request.
 * @param {string} senderName - Name of the sender.
 * @param {string} recipientName - Name of the person who accepted the request.
 * @param {string} profileUrl - Profile link of the recipient.
 */
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

    const recipient = [{ email: senderEmail }];

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
    });

    console.log("Connection accepted email sent successfully:", response);
  } catch (error) {
    console.error("Error sending connection accepted email:", error.message);
    throw error;
  }
};
