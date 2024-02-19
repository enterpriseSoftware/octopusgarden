require("dotenv").config();
const postmark = require("postmark");

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  console.log(`http method = ${method}`);

  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST Requests Allowed",
    };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: "Please provide name, email, subject, and message",
    };
  }

  const { EMAIL_API_KEY, EMAIL_TO } = process.env;

  var client = new postmark.ServerClient(EMAIL_API_KEY);

  // Promisify the sendEmail call
  try {
    await new Promise((resolve, reject) => {
      client.sendEmail(
        {
          From: 'webologist@enterprisesoftware.biz',
          To: EMAIL_TO,
          Subject: `${subject} from ${name}`,
          HtmlBody: `<p>from: ${email}</p><p>message:${message}</p>`,
          MessageStream: "outbound",
        },
        (error, result) => {
          if (error) {
            console.error("Unable to send via Postmark: " + error.message);
            reject(error);
          } else {
            console.info("Sent to Postmark for delivery");
            resolve(result);
          }
        }
      );
    });
    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
