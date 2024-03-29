import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChatRooms",
    short_name: "ChatRooms",
    description: "A private and secure temporary chat room generator.",
    start_url: "/",
    display: "standalone",
    background_color: "#38404A",
    theme_color: "#38404A",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

// {
//   "name": "ChatRooms",
//   "short_name": "ChatRooms",
//   "start_url": "/",
//   "icons": [
//     {
//       "src": "/favicon/android-chrome-192x192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "/favicon/android-chrome-512x512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     }
//   ],
//   "shortcuts": [
//     {
//       "name": "Join existing room",
//       "short_name": "Join",
//       "description": "Join a private room that already exists.",
//       "url": "/join",
//       "icons": [
//         {
//           "src": "/favicon/android-chrome-192x192.png",
//           "sizes": "192x192"
//         }
//       ]
//     }
//   ],
//   "theme_color": "#38404A",
//   "background_color": "#38404A",
//   "display": "standalone",
//   "description": ""
// }
