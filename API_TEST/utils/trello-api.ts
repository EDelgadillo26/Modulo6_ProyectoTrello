// import { APIRequestContext } from '@playwright/test';

// export async function trelloGet(api: APIRequestContext, endpoint: string) {
//   return await api.get(endpoint, {
//     params: {
//       key: process.env.API_KEY!,
//       token: process.env.API_TOKEN!,
//     }
//   });
// }

// export async function trelloPost(api: APIRequestContext, endpoint: string, data?: any) {
//   const url = `${process.env.BASE_URL}${endpoint}?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`;
//   console.log('🌍 URL final:', url);
//   return await api.post(endpoint, {
//     params: {
//       key: process.env.API_KEY!,
//       token: process.env.API_TOKEN!,
//     },
//     data,
//   });
// }

// export async function trelloDelete(api: APIRequestContext, endpoint: string) {
//   return await api.delete(endpoint, {
//     params: {
//       key: process.env.API_KEY!,
//       token: process.env.API_TOKEN!,
//     }
//   });
// }