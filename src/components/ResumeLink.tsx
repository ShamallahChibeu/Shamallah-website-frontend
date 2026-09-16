"use client";

export default function ResumeLink() {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    alert("Résumé coming soon!");
  }

  return (
    <a href="#" onClick={handleClick} className="text-signal text-sm font-semibold hover:underline">View full résumé ↗</a>
  );
}
