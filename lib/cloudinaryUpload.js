import streamifier from "streamifier";
import cloudinary from "./cloudinary";

/**
 * Uploads a Buffer to Cloudinary. Returns { url, publicId }.
 */
const uploadBufferToCloudinary = (buffer, folder = "corps-prints") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Converts Web API File objects (from a Next.js Request's formData()) into
 * Buffers, then uploads each to Cloudinary in parallel.
 * Returns an array of { url, publicId }.
 */
export const uploadWebFiles = async (files = [], folder) => {
  const validFiles = files.filter((f) => f && typeof f.arrayBuffer === "function" && f.size > 0);
  if (validFiles.length === 0) return [];

  return Promise.all(
    validFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return uploadBufferToCloudinary(buffer, folder);
    })
  );
};

export { uploadBufferToCloudinary };
/**
 * For design files (pdf, ai, psd, cdr, eps, ...) and documents (pdf, doc, docx, ...).
 * resource_type "auto" lets Cloudinary store images as images and anything else as raw files.
 * Returns an array of { url, publicId, originalName }.
 */
export const uploadWebDocuments = async (files = [], folder) => {
  const validFiles = files.filter((f) => f && typeof f.arrayBuffer === "function" && f.size > 0);
  if (validFiles.length === 0) return [];

  return Promise.all(
    validFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "auto", use_filename: true, unique_filename: true },
          (error, res) => (error ? reject(error) : resolve(res))
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
      return { url: result.secure_url, publicId: result.public_id, originalName: file.name };
    })
  );
};