import { fetchVideos } from "../hygraph.js";

export default async function renderWorksPreview() {
    const videos = await fetchVideos();
    
    if (videos.length === 0) {
        return `<p class="no-videos" style="font-size: 2.4rem">There is nothing for you to preview :((</p>`;
    }
    
    // Limited 6 videos
    const previewVideos = videos.slice(0, 6);

    return `
    <div class="works__wrapper" style="margin-top: 20px;">
        ${previewVideos.map(video => `
            <article class="work">
                <div class="work__wrapper">
                    <p class="work__class">${video.category.visibility || '?'}</p>
                    <p class="work__genre">${video.category.name || '?'}</p>
                </div>
                <a href="/video/${video.slug}" data-route="video" data-slug="${video.slug}" class="work__link">
                    <div class="work__link__wrapper">
                        <img src="${video.thumbnail.url}" alt="${video.title}" class="work__link__image">
                        <div class="work__link__title">
                            <h1>${video.title}</h1>
                        </div>
                    </div>
                </a>
            </article>
        `).join('')}
    </div>
`;


}