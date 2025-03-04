import { SEND_VERIFICATION_CODE } from "../middlewares/mailtrap/emailTemplates.js";
import { client, sender } from "../middlewares/mailtrap/mailtrap.js";

export const sendVerificationCode = (code, email, username) => {
  try {
    client.send({
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
