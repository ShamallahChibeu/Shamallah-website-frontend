"use client";

import { useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const CLOUD_NAME = "fbcxmiyr";
const UPLOAD_PRESET = "shamallah_uploads";

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.secure_url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value && (
        <img src={value} alt="Preview" className="w-32 h-20 object-cover rounded-md border border-white/10 mb-2" />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-muted" />
      {uploading && <p className="text-xs text-signal mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
