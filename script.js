async function getNews() {
  const apiKey = "15c802ae3a7c446bba1473974e701e81"; // Replace with your NewsAPI key
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("news-container");
    container.innerHTML = "";

    // Banner setup
    let bannerIndex = 0;
    const bannerImg = document.getElementById("banner-img");
    const bannerTitle = document.getElementById("banner-title");
    const bannerDesc = document.getElementById("banner-desc");
    const bannerLink = document.getElementById("banner-link");

    function updateBanner(article) {
      bannerImg.style.opacity = 0;
      setTimeout(() => {
        bannerImg.src = article.urlToImage || "https://via.placeholder.com/800x400";
        bannerTitle.textContent = article.title;
        bannerDesc.textContent = article.description || "No description available.";
        bannerLink.href = article.url;
        bannerImg.style.opacity = 1;
      }, 500);
    }

    if (data.articles.length > 0) {
      updateBanner(data.articles[0]);

      setInterval(() => {
        bannerIndex = (bannerIndex + 1) % data.articles.length;
        updateBanner(data.articles[bannerIndex]);
      }, 5000); // change every 5 seconds
    }

    // News cards
    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${article.urlToImage || "https://via.placeholder.com/400x200"}" alt="News Image">
        <div class="news-card-content">
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    document.getElementById("news-container").innerHTML =
      "Error fetching news!";
  }
}
