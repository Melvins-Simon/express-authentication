import { SEND_VERIFICATION_CODE } from "../middlewares/mailtrap/emailTemplates.js";
import { client, sender } from "../middlewares/mailtrap/mailtrap.js";
import "dotenv/config";

export const sendVerificationCode = async (code, email, username) => {
  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: "Verify your email",
      html: SEND_VERIFICATION_CODE.replace("{name}", username).replace(
        "{verificationcode}",
        code
      ),
      category: "Email verification.",
    });
  } catch (error) {
    throw new Error(`Error sending mail -> ${error}`);
  }
};

export const sendWelcomeEmail = async (username, email) => {
  try {
    await client.send({
      from: sender,
      to: [{ email }],
      template_uuid: process.env.MAILTRAP_TEMPLATE_UUID,
      template_variables: {
        name: username,
      },
    });
  } catch (error) {
    throw new Error(`Error sending mail -> ${error}`);
  }
};
