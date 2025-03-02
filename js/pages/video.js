import { fetchVideos } from '../hygraph.js';

export default async function renderVideo(slug) {
    const videos = await fetchVideos();
    const video = videos.find(v => v.slug === slug);

    if (!video) {
        return `<h2>Video not found: ${slug}</h2>`;
    }

    
    function isGraphAssetImage(url) {
        return typeof url === "string" && url.includes("graphassets.com");
    }

    let mediaContent;

    if (video.linkEmbed) {
        if (isGraphAssetImage(video.linkEmbed)) {
            mediaContent = `<img src="${video.linkEmbed}" alt="${video.title}" width="100%" height="100%" />`;
        } else {
            mediaContent = `
                <iframe width="640" height="360" src="${video.linkEmbed}" 
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                               gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>`;
        }
    } else if (video.imageEmbed) {
        if (Array.isArray(video.imageEmbed) && video.imageEmbed.length > 0) {
            
            mediaContent = video.imageEmbed.map(img => `
                <div class="page__imageEmbed">
                    <img loading="lazy" src="${img.url}" alt="${video.title}" width="100%" height="100%" />
                </div>
            `).join('');
        } else if (video.imageEmbed.url) {

            mediaContent = `<img src="${video.imageEmbed.url}" alt="${video.title}" width="100%" height="100%" />`;
        } else {
            mediaContent = `<p style="font-size: 2rem; color: red;">Error: No media available</p>`;
        }
    } else {
        mediaContent = `<p style="font-size: 2rem; color: red;">Error: No media available</p>`;
    }

    return `
        <div class="wrapper">
            <div class="page">
                <div>
                    <p class="page__title">${video.title || "No title"}</p>
                </div>
                <div class="page__heading">
                    <p class="page__artist">${video.nameArtist || "Unknown artist"}</p>
                </div>
                <div class="page__wrapper">
                    <div class="page__youtube">
                        ${mediaContent}
                    </div>
                </div>

                <div class="page__about">
                    <div class="page__credit">
                        <h1 class="page__credit__title">CREDIT</h1>
                        <div class="page__credit__html">
                        ${
                            (video.descCredit || "Nothing or updating...")
                              .split(/\r?\n+/)
                              .filter(line => line.trim() !== '')
                              .map(line => `<p>${line.trim()}</p>`)
                              .join('')
                        }
                        </div>
                    </div>

                    <div class="page__desc">
                        <h1 class="page__desc__title">ABOUT</h1>
                        <div class="page__desc__html">
                        ${
                            (video.descAbout || "Nothing or updating...")
                              .split(/\r?\n+/)
                              .filter(line => line.trim() !== '')
                              .map(line => `<p>${line.trim()}</p>`)
                              .join('')
                        }
                        </div>
                    </div>
                </div>

                <div class="page__review">
                ${(video.imagePreview && video.imagePreview.length > 0) ? 
                    video.imagePreview.map(img => `
                        <div class="page__review__img">
                            <img loading="lazy" src="${img.url}" alt="${video.title}" />
                        </div>
                    `).join('')
                  : `<div class="page__review__img"></div>`}
                </div>
            </div>
        </div>
    `;
}
