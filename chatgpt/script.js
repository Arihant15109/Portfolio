document.addEventListener("DOMContentLoaded", () => {
    // Initialize your variables after DOM is fully loaded
    const chatInput = document.querySelector("#chat-input");
    const sendButton = document.querySelector("#send-btn");
    const chatContainer = document.querySelector(".chat-container");
    const themeButton = document.querySelector("#lightbtn");
    const deleteButton = document.querySelector("#deletebtn");

    let userText = null;

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    const initialHeight = chatInput.scrollHeight;
    
    const API_KEY = "AIzaSyDHroJKj_omiOF2EFCnk_kwSV5pLFLJuiU";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const loadDataFromLocalStorage = () => {
        const themeColor = localStorage.getItem("theme-color");

        if (themeColor === "light") {
            document.body.classList.add("light-mode");
            themeButton.innerText = "dark_mode"; 
        } else {
            document.body.classList.remove("light-mode");
            themeButton.innerText = "light_mode";
        }

        const defaultText = `<div class="default-text">
                                <h1>ChatGPT Clone</h1>
                                <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p>
                            </div>`

        chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
        
        scrollToBottom(); // Call only after the chatContainer is initialized
    };

    loadDataFromLocalStorage();

    const createElement = (html, className) => {
        const chatDiv = document.createElement("div");
        chatDiv.classList.add("chat-outgoing", className);
        chatDiv.innerHTML = html;
        return chatDiv;
    };

    const generateAPIResponse = async (incomingChatDiv) => {
        const pElement = document.createElement("p");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: userText
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            pElement.textContent = data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.log("Error:", error);
            pElement.textContent = "Sorry, something went wrong. Please try again.";
        }

        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
        localStorage.setItem("all-chats", chatContainer.innerHTML);

        scrollToBottom();   
    };

    const copyResponse = (copyBtn) => {
        const responseTextElement = copyBtn.parentElement.querySelector("p");
        navigator.clipboard.writeText(responseTextElement.textContent);
        copyBtn.textContent = "done";
        setTimeout(() => copyBtn.textContent = "content_copy", 1000);
    };

    const showTypingAnimation = () => {
        const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="chatgpt.webp" alt="chatgpt-img">
                            <div class="typing-animation">
                                <div class="typing-dot" style="--delay:0.2s"></div>
                                <div class="typing-dot" style="--delay:0.3s"></div>
                                <div class="typing-dot" style="--delay:0.4s"></div>
                            </div>
                        </div>
                        <span class="material-symbols-outlined content-copy">content_copy</span>
                    </div>`;

        const incomingChatDiv = createElement(html, "incoming");
        chatContainer.appendChild(incomingChatDiv);

        const copyBtn = incomingChatDiv.querySelector('.content-copy');
        copyBtn.addEventListener('click', () => copyResponse(copyBtn));

        generateAPIResponse(incomingChatDiv);

        scrollToBottom();
    };

    const handleOutgoingChat = () => {
        userText = chatInput.value.trim();
        if (!userText) return;

        chatInput.value = "";
        chatInput.style.height = `${initialHeight}px`;

        const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="avatar.jpg" alt="user-profile">
                            <p></p>
                        </div>
                    </div>`;

        // Create an outgoing chat div with user's message and append it
        const outgoingChatDiv = createElement(html, "outgoing");
        outgoingChatDiv.querySelector("p").textContent = userText;
        document.querySelector(".default-text")?.remove();
        chatContainer.appendChild(outgoingChatDiv);

        scrollToBottom();
        setTimeout(showTypingAnimation, 500);
    };

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
        localStorage.setItem("theme-color", theme);
        themeButton.innerText = theme === "light" ? "dark_mode" : "light_mode";
    });

    deleteButton.addEventListener("click", () => {
        if(confirm("Are you sure you want to delete all the chats")) {
            localStorage.removeItem("all-chats");
            chatContainer.innerHTML = "";
        }
    });

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${initialHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleOutgoingChat();
        }
    });

    sendButton.addEventListener("click", handleOutgoingChat);
});
