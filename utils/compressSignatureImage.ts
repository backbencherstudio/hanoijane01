/**
 * Compress a signature image before it is stored / uploaded.
 *
 * Large photos (e.g. a phone picture of a signature) can be several MB.
 * This downscales the image to a max dimension and re-encodes it, keeping
 * PNG transparency when present and using JPEG otherwise for much smaller
 * payloads. It never throws — on any failure the original file is returned
 * so the upload flow is never blocked.
 */

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;
// Files smaller than this are already small enough — skip re-encoding.
const SKIP_THRESHOLD_BYTES = 300 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

export async function compressSignatureImage(file: File): Promise<File> {
  try {
    // Only raster images can be compressed in-browser
    if (
      typeof window === "undefined" ||
      !file.type.startsWith("image/") ||
      file.type === "image/svg+xml"
    ) {
      return file;
    }

    if (file.size <= SKIP_THRESHOLD_BYTES) {
      return file;
    }

    const dataUrl = await readAsDataUrl(file);
    const img = await loadImage(dataUrl);

    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight),
    );
    const width = Math.max(1, Math.round(img.naturalWidth * scale));
    const height = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    // PNG stays PNG (transparency preserved), everything else becomes JPEG
    const keepPng = file.type === "image/png";
    const outputType = keepPng ? "image/png" : "image/jpeg";

    if (!keepPng) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, outputType, JPEG_QUALITY);
    if (!blob || blob.size >= file.size) {
      // Compression didn't help — keep the original
      return file;
    }

    const baseName = file.name?.replace(/\.[^.]+$/, "") || "signature";
    const extension = keepPng ? "png" : "jpg";
    return new File([blob], `${baseName}.${extension}`, {
      type: outputType,
    });
  } catch {
    // Never block the user because of a compression failure
    return file;
  }
}

/**
 * Convert a stored base64 data URL back into a binary File, so a restored
 * session (where the File object is gone) can still upload the signature.
 */
export async function dataUrlToFile(
  dataUrl: string,
  fileName = "signature.png",
): Promise<File> {
  const blob = await (await fetch(dataUrl)).blob();
  return new File([blob], fileName, { type: blob.type || "image/png" });
}
