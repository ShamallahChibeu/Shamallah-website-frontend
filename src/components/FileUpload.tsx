"use client";

import { useState } from "react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const CLOUD_NAME = "fbcxmiyr";
const UPLOAD_PRESET = "shamallah_uploads";

export default function FileUpload({ value, onChange }: FileUploadProps) {
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
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
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
      {value && <p className="text-xs text-accent-green mb-2">File attached ✓</p>}
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="text-xs text-muted" />
      {uploading && <p className="text-xs text-signal mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
