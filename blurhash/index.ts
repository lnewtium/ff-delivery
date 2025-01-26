import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createCanvas,
  Image,
  loadImage,
} from "https://deno.land/x/canvas/mod.ts";
import { encode } from "https://deno.land/x/blurhash@v1.0/mod.ts";
import sharp from "npm:sharp";

import { Database } from "./supabase.ts";

export const supabase = createClient<Database>(
  "https://iomlfefrrecmhlhetezt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbWxmZWZycmVjbWhsaGV0ZXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDAxNzMsImV4cCI6MjA1MTU3NjE3M30.3U1kHTJQU2stPNyjl2LZu8Hkp0Sd47G1mU2YfpOCz8E",
);

const getImageData = (image: Image) => {
  const canvas = createCanvas(image.width(), image.height());
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, image.width(), image.height());
};

const allImages = await supabase.from("products").select("*");

for (const image of allImages.data!) {
  const { data: imageData } = await supabase.storage
    .from("products")
    .download(image.img + ".jpg" as string);
  const buffer = await imageData!.arrayBuffer();
  const resizedImage = await sharp(buffer).resize(64, 64).jpeg({
    quality: 100,
  }).toBuffer();

  if (resizedImage) {
    const arrayBuffer = new Uint8Array(resizedImage);
    const imageBuf = await loadImage(arrayBuffer);
    const pixels = getImageData(imageBuf);

    if (pixels) {
      const encoded = encode(pixels.data, 64, 64, 4, 3);

      if (encoded) {
        console.log(image.id, encoded);
      }
    }
  }
}
