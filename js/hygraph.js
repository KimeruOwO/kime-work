export async function fetchVideos() {
  const endpoint = 'https://us-west-2.cdn.hygraph.com/content/cm7dhcrgp00lp07w2l55jii50/master';

  let allVideos = [];
  let skip = 0;
  const limit = 100;
  let hasMore = true;

  try {
    while (hasMore) {
      const query = `
        query AllVideos {
          videos(first: ${limit}, skip: ${skip}, stage: PUBLISHED, orderBy: createdAt_DESC) {
            id
            title
            slug
            nameArtist
            linkEmbed
            imageEmbed {
              url
            }
            descCredit
            descAbout
            thumbnail {
              url(
                transformation: {
                  image: { resize: { width: 640, height: 360, fit: crop } }
                }
              )
            }
            imagePreview {
              url(
                transformation: {
                  image: { resize: { width: 960, height: 540, fit: clip } }
                }
              )
            }
            category {
              name
              visibility
            }
          }
        }
      `;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const json = await response.json();
      const videos = json.data.videos;

      allVideos = allVideos.concat(videos);

      if (videos.length < limit) {
        hasMore = false;
      } else {
        skip += limit;
      }
    }
    return allVideos;
  } catch (error) {
    console.error('Error when fetching videos:', error);
    return [];
  }
}
