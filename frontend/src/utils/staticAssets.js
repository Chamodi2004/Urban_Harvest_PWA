export const STATIC_IMAGE_PATHS = [
  "/favicon.jpg",
  "/IMG1.jpg",
  "/IMG2.jpg",
  "/workshop.jpg",
  "/composite bin.jpg",
  "/recycling.jpg",
  "/seeds.jpg",
  "/tools.jpg",
  "/gardening.jpg",
  "/icon-192.png",
  "/icon-512.png",
];

const IMAGE_CACHE = "static-images";

export async function precacheStaticImages() {
  if (!("caches" in window)) {
    return;
  }

  const cache = await caches.open(IMAGE_CACHE);

  await Promise.all(
    STATIC_IMAGE_PATHS.map(async (path) => {
      const cached = await cache.match(path);
      if (cached) {
        return;
      }

      try {
        const response = await fetch(path);
        if (response.ok) {
          await cache.put(path, response);
        }
      } catch {
        // Asset may be unavailable while offline
      }
    })
  );
}
