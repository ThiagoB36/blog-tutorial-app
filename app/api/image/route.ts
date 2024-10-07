"use client";

/* import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudinary from "@/app/lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return uploadNewImage(req, res);
    case "GET":
      return readAllImages(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

const uploadNewImage: NextApiHandler = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const imageFile = files.image as formidable.File[];
    await cloudinary.uploader.upload(imageFile.filepath);
  });
};

const readAllImages: NextApiHandler = (req, res) => {};

export default handler;
 */

import { NextResponse } from "next/server";
import { IncomingMessage } from "http";
import formidable from "formidable";
import cloudinary from "@/app/lib/cloudinary";

// Define runtime configuration
export const runtime = "nodejs"; // or 'edge'

// Disable automatic body parsing by Next.js
/* export const config = {
  api: {
    bodyParser: false,
  },
}; */

// POST request handler
export async function POST(req: Request) {
  // Convert the Next.js Request to the native Node.js IncomingMessage
  const incomingReq = req as unknown as IncomingMessage;

  const form = formidable({ multiples: true });

  const formData = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      form.parse(incomingReq, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );

  const { files } = formData;
  const imageFile = files.image as formidable.File; // Adjust type if necessary

  if (!imageFile) {
    return NextResponse.json({ error: "No image file found" }, { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(imageFile.filepath);
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    return NextResponse.json(
      {
        /* error: error.message */
      },
      { status: 500 }
    );
  }
}

// GET request handler
export async function GET() {
  // Your logic to read all images
  return NextResponse.json({ message: "Read all images" });
}
