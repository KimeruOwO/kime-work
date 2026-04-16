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
    href: "https://twitter.com/Kimeru2001",
    label: "X (Twitter)",
    platform: "x",
  },
  {
    href: "https://www.youtube.com/@kimeru_kirisu8572",
    label: "YouTube",
    platform: "youtube",
  },
  {
    href: "https://www.pixiv.net/en/users/44620302",
    label: "Pixiv",
    platform: "pixiv",
  },
];
