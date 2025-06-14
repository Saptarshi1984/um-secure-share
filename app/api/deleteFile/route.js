// app/api/deleteFile/route.js

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  const { public_id } = body;

  if (!public_id) {
    return new Response(JSON.stringify({ error: 'Missing public_id' }), {
      status: 400,
    });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
