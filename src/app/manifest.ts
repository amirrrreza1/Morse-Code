import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Morse Code Converter",
    short_name: "Morse Code",
    description:
      "A Morse Code Converter that allows you to convert text to Morse and morse to text practically in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/Images/Icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Images/Icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
