export const BASE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "https://ezy-ticket-server-eta.vercel.app";

export const BASE_API_URL =
  import.meta.env.VITE_API_URL || `${BASE_SERVER_URL}/api/v1`;
