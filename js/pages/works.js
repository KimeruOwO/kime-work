import { fetchVideos } from "../hygraph.js";

export default async function () {
  const videos = await fetchVideos();

  const renderVideos = (videoArray) =>
    videoArray.length === 0
      ? `<p class="no-videos" style="font-size:2.4rem">There is nothing here!</p>`
      : videoArray
          .map(
            (video) => `
      <article class="work">
        <div class="work__wrapper">
          <p class="work__class">${video.category.visibility}</p>
          <p class="work__genre">${video.category.name}</p>
        </div>
        <a href="#video/${video.slug}" data-route="video" data-slug="${video.slug}" class="work__link">
          <div class="work__link__wrapper">
            <img loading="lazy" src="${video.thumbnail.url}" alt="${video.title}" class="work__link__image">
            <div class="work__link__title">
                <h1>${video.title}</h1>
            </div>
          </div>
        </a>
      </article>
    `
          )
          .join("");

  const html = `
    <section class="works">
      <h1 class="title">WORKS</h1>
      <h2 class="desc">Click on the thumbnail for more details</h2>

      <div class="works__genre">
        <div class="works__genre__button">
          <button translate="no" class="active">All</button>
        </div>
        <div class="works__genre__button">
          <button translate="no">Motion Graphics</button>
        </div>
        <div class="works__genre__button">
          <button translate="no">MusicVideos//MVs</button>
        </div>
        <div class="works__genre__button">
          <button translate="no">Graphics Design</button>
        </div>
      </div>

      <div class="works__wrapper" style="margin-top: 20px;">
        ${renderVideos(videos)}
      </div>
    </section>
  `;

  setTimeout(() => {
    const buttons = document.querySelectorAll(".works__genre__button button");
    const wrapper = document.querySelector(".works__wrapper");


    const updateWrapper = (videoList) => {
      wrapper.innerHTML = renderVideos(videoList);
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
    
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.textContent.trim().toLowerCase();

    
        if (category === "all") {
          updateWrapper(videos);
        } else {
      
          const filteredVideos = videos.filter(
            (video) =>
              video.category.name &&
              video.category.name.toLowerCase() === category
          );
          updateWrapper(filteredVideos);
        }
      });
    });
  }, 0);

  return html;
}
