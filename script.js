fetch("data.json")
  .then(response => response.json())
  .then(posts => {
    const feed = document.getElementById("feed");
    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <div class="username">@${post.username}</div>
        <img src="${post.image}" alt="Post Image">
        <p>${post.caption}</p>
        <button class="like-btn">❤️ ${post.likes}</button>
      `;
      feed.appendChild(postDiv);
    });

    document.querySelectorAll(".like-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let likes = parseInt(btn.textContent.replace("❤️ ", ""));
        btn.textContent = `❤️ ${likes + 1}`;
      });
    });
  });
