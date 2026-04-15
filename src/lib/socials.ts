// src/lib/socials.ts
// Single source of truth for all social media links across the site.
// Used by: Footer.astro, InfoWindow.astro

export interface SocialLink {
  href: string;
  label: string;
  platform: "facebook" | "x" | "youtube" | "pixiv";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.facebook.com/kimeyu.art",
    label: "Facebook",
    platform: "facebook",
  },
  {
    href: "https://x.com/kimeyu_art",
    label: "X (Twitter)",
    platform: "x",
  },
  {
    href: "https://www.youtube.com/@kimeyu",
    label: "YouTube",
    platform: "youtube",
  },
  {
    href: "https://www.pixiv.net/users/kimeyu",
    label: "Pixiv",
    platform: "pixiv",
  },
];
