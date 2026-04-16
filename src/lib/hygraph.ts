// src/lib/hygraph.ts

interface Asset {
  url: string;
  fullUrl?: string;
  heroUrl?: string;
}

interface Category {
  name: string;
  slug: string;
  visibility?: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  nameArtist: string;
  linkEmbed: string;
  linkOriginal?: string;
  linkFacebook?: string;
  imageEmbed: Asset[];
  descCredit: string;
  descAbout: string;
  thumbnail: Asset;
  imagePreview: Asset[];
  category?: Category;
  isFeatured?: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  linkPixiv?: string;
  image: Asset;
  category: Category;
}

const HYGRAPH_ENDPOINT = import.meta.env.HYGRAPH_ENDPOINT;

async function fetchAPI<T>(query: string, variables = {}): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("Missing HYGRAPH_ENDPOINT environment variable.");
  }

  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    const errorMessage = json.errors.map((e: { message: string }) => e.message).join(" | ");
    throw new Error(`GraphQL Error: ${errorMessage}`);
  }

  return json.data as T;
}

export async function fetchArtworks(): Promise<Artwork[]> {
  const data = await fetchAPI<{ artworks: Artwork[] }>(`
    query AllArtworks {
      artworks(first: 100, skip: 0, stage: PUBLISHED, orderBy: createdAt_DESC) {
        id
        title
        slug
        linkPixiv
        image {
          url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 540, height: 540, fit: clip } } })
          fullUrl: url
          heroUrl: url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 1920, fit: clip } } })
        }
        category { 
            name 
            slug 
        }
      }
    }
  `);
  return data.artworks;
}

export async function fetchVideos(): Promise<Video[]> {
  const data = await fetchAPI<{ videos: Video[] }>(`
    query AllVideos {
      videos(first: 100, skip: 0, stage: PUBLISHED, orderBy: createdAt_DESC) {
        id
        title
        slug
        nameArtist
        linkEmbed
        linkFacebook
        imageEmbed { 
          url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 1200, fit: clip } } })
          fullUrl: url
          heroUrl: url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 1920, fit: clip } } })
        }
        descCredit
        descAbout
        thumbnail {
          url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 640, height: 360, fit: crop } } })
          fullUrl: url
          heroUrl: url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 1920, fit: clip } } })
        }
        imagePreview {
          url(transformation: { document: { output: { format: webp } }, image: { resize: { width: 960, height: 540, fit: clip } } })
          fullUrl: url
        }
        category { name visibility }
        isFeatured
      }
    }
  `);
  
  return data.videos.map((vid): Video => {
    let linkOriginal = vid.linkEmbed;
    
    if (vid.linkEmbed && vid.linkEmbed.includes("/embed/")) {
      const videoId = vid.linkEmbed.split("/embed/")[1]?.split("?")[0];
      if (videoId) {
        // ĐÃ FIX LỖI SYNTAX Ở ĐÂY
        linkOriginal = `https://www.youtube.com/watch?v=${videoId}`;
      }
    }
    
    let linkFacebook = vid.linkFacebook;
    if (linkFacebook) {
      const reelMatch = linkFacebook.match(/\/reel\/(\d+)/);
      const watchMatch = linkFacebook.match(/watch\/\?v=(\d+)/);

      if (reelMatch?.[1]) {
        linkFacebook = `https://www.facebook.com/reel/${reelMatch[1]}`;
      } else if (watchMatch?.[1]) {
        linkFacebook = `https://www.facebook.com/watch/?v=${watchMatch[1]}`;
      }
    }
    
    return {
      ...vid,
      linkOriginal,
      linkFacebook
    };
  });
}