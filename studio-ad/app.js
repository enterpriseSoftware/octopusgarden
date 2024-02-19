const sendTitle = document.getElementById("send-title");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const btn = document.getElementById("submit-btn");
const alert = document.querySelector(".alert");
const emailAlert = document.getElementById("email-alert");
emailAlert.style.display = "none";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  emailAlert.style.display = "none";
  btn.innerHTML = '<span class="sending"></span>';
  btn.disabled = true;

  const name = nameInput.value;
  const email = emailInput.value;
  const subject = subjectInput.value;
  const message = messageInput.value;

  try {
    await axios.post("/.netlify/functions/studio-ad", {
      name,
      email,
      subject,
      message,
    });

    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
    sendTitle.textContent = "Message Sent!";
    setTimeout(() => {
      sendTitle.textContent = "Contact Us";
    }, 3000);
  } catch (error) {
    emailAlert.style.display = "block";
    emailAlert.textContent = emailAlert.textContent = error.message;
    btn.innerHTML = "Email for Consoltation";
  }
  btn.disabled = false;
  btn.innerHTML = "Email for Consoltation";
});
