import { GoogleGenerativeAI } from "@google/generative-ai";
let own = "Masti : ";

// Access your API key (see "Set up your API key" above)
// HP - API KEY
	const HPAI = new GoogleGenerativeAI('AIzaSyAIeQPmLjUar1Vi7pIHl9ufXWrMakn3IXY');

	async function run(prompt) {
	// For text-only input, use the gemini-pro model
	const HPmodel = HPAI.getGenerativeModel({ model: "gemini-pro"});

	// const prompt = "Write a story about a magic backpack."

	const result = await HPmodel.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(own + text);
	return text;

	}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", async(e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      await output(input);
    }
  });
});

async function output(input) {
  let product = await run(input);

  // Update DOM
  addChat(input, product);
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )
//  console.log(input,product);

}