import { encryptFile, generateKey, exportKey } from "../utils/encryption";


export async function encryptedUploadToCloudinary(file, uploadPreset, cloudName, userId) {
  const key = await generateKey();
  const { encryptedContent, iv } = await encryptFile(file, key);
  const blob = new Blob([encryptedContent], { type: "application/octet-stream" });

  // ✅ Create a public_id including folder + filename
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/\s+/g, "_");
  const publicId = `secure-share/${userId}/${timestamp}_${sanitizedFileName}`;

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", uploadPreset);
  formData.append("public_id", publicId); // ✅ correct way to define path

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  const exportedKey = await exportKey(key);

  return {
    secureUrl: data.secure_url,
    public_id: data.public_id, // will include secure-share/userId/...
    encryptionKey: exportedKey,
    iv: Array.from(iv),
  };
}
