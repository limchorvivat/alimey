export default [
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["http://192.168.85:3000"], // Replace with your frontend's local IP
      credentials: true,
    },
  },
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
