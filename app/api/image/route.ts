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

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "@/app/lib/cloudinary";

// Set the runtime environment for Next.js 13+ (Edge or Node.js)
export const runtime = "nodejs"; // or 'edge' depending on your preference

// Disable Next.js body parsing so formidable can handle multipart form data
/* export const config = {
  api: {
    bodyParser: false,
  },
}; */

// API handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return await uploadNewImage(req, res);
    case "GET":
      return readAllImages(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

// Function to handle file uploads
const uploadNewImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const imageFile = files.image as unknown as formidable.File; // Adjust type based on how the file is being sent
    if (!imageFile) {
      return res.status(400).json({ error: "No image file found" });
    }

    try {
      const result = await cloudinary.uploader.upload(imageFile.filepath);
      return res.status(200).json({ success: true, url: result.secure_url });
    } catch (uploadError) {
      return res.status(500).json({
        /* error: uploadError.message */
      });
    }
  });
};

// Function to handle fetching all images (this should be implemented based on your requirements)
const readAllImages = async (req: NextApiRequest, res: NextApiResponse) => {
  // Fetch and return all images logic
  return res.status(200).json({ message: "Read all images" });
};

export default handler;
