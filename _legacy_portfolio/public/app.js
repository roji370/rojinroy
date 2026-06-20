// --- SOCKET.IO REAL-TIME COMMENTS CONTROLLER ---

let socket = io();

const commentForm = document.getElementById("comment-form-widget");
const usernameInput = document.getElementById("comment-username-input");
const commentTextArea = document.getElementById("comment-text-area");
const commentsList = document.getElementById("live-comments-list");
const typingDiv = document.getElementById("typing-indicator-div");

// Submit comment event listener
if (commentForm) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const comment = commentTextArea.value.trim();
    
    if (!username || !comment) {
      return;
    }
    
    postComment(username, comment);
  });
}

function postComment(username, comment) {
  const data = {
    username: username,
    comment: comment,
    time: new Date()
  };
  
  // Append to the DOM locally
  appendToDom(data);
  
  // Clear message textarea (keep name for faster successive comments)
  commentTextArea.value = "";
  
  // Broadcast to other connected clients via Socket
  broadcastComment(data);
  
  // Sync with MongoDB backend database
  syncWithDb(data);
}

function appendToDom(data) {
  const commentCard = document.createElement("div");
  commentCard.classList.add("comment-card");
  
  // Get initial letters for avatar
  const initials = data.username
    ? data.username.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "??";
    
  // Format timestamp nicely
  const timeFormatted = data.time ? moment(data.time).calendar() : moment().calendar();
  
  const markup = `
    <div class="comment-header">
      <div class="comment-author-info">
        <div class="comment-avatar">${initials}</div>
        <span class="comment-author">${data.username}</span>
      </div>
      <div class="comment-time">
        <i class="fa-regular fa-clock"></i>
        <span>${timeFormatted}</span>
      </div>
    </div>
    <div class="comment-text">${data.comment}</div>
  `;
  
  commentCard.innerHTML = markup;
  
  // Prepend to display latest comments at the top
  if (commentsList) {
    commentsList.prepend(commentCard);
  }
}

function broadcastComment(data) {
  socket.emit("comment", data);
}

// Receive real-time comment from socket
socket.on("comment", (data) => {
  appendToDom(data);
});

// Debounce helper for typing status
let typingTimer = null;
function debounce(func, delay) {
  if (typingTimer) {
    clearTimeout(typingTimer);
  }
  typingTimer = setTimeout(() => {
    func();
  }, delay);
}

// Emits typing event when user types in textarea
if (commentTextArea) {
  commentTextArea.addEventListener("keyup", () => {
    const username = usernameInput.value.trim() || "Anonymous visitor";
    socket.emit("typing", { username });
  });
}

// Listens for typing status from server
socket.on("typing", (data) => {
  if (typingDiv) {
    typingDiv.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>${data.username} is typing...</span>
    `;
    
    debounce(() => {
      typingDiv.innerHTML = "";
    }, 1200);
  }
});

// Sync comment with backend database API
function syncWithDb(data) {
  const headers = {
    "Content-Type": "application/json"
  };
  
  fetch("/api/comments", { 
    method: "POST", 
    body: JSON.stringify(data), 
    headers 
  })
  .then(res => res.json())
  .then(result => {
    console.log("DB sync response:", result);
  })
  .catch(err => {
    console.error("DB sync failure:", err);
  });
}

// Fetch all existing comments on page load
function fetchComments() {
  fetch("/api/comments")
  .then(res => res.json())
  .then(comments => {
    // Clean up current display list
    if (commentsList) {
      commentsList.innerHTML = "";
    }
    
    // Server returns comments oldest to newest, so we append them in sequence
    // to match prepend behaviors, or reverse them.
    comments.forEach(comment => {
      comment.time = comment.createdAt;
      appendToDom(comment);
    });
  })
  .catch(err => {
    console.error("Error fetching comments database:", err);
    if (commentsList) {
      commentsList.innerHTML = `<div class="comment-card" style="text-align:center; color: var(--text-muted);">Could not load live guestbook messages at this time.</div>`;
    }
  });
}

// Trigger initial comments fetch
window.addEventListener("load", fetchComments);
