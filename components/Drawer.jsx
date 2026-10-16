"use client";

import { useEffect } from "react";

// Сэдэв дээр дарахад баруун талаас нээгдэх мэдээллийн хэсэг
export default function Drawer({ topic, onClose, onToggle }) {
  const isOpen = Boolean(topic);

  // Esc дарвал хаагдана, нээлттэй үед ард талын хуудас гүйхгүй
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!topic) return null;

  const isDone = topic.status === "done";

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={topic.title}
        className="h-full w-full max-w-md overflow-y-auto border-l-4 border-[#EC4899] bg-white p-5 text-[#1E293B]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-[#EC4899]">{topic.category}</p>
        <h2 className="mb-2 text-2xl font-bold text-[#3B82F6]">{topic.title}</h2>
        <p className="leading-relaxed">{topic.description}</p>

        <h3 className="mb-1 mt-5 font-bold">Дэд сэдвүүд</h3>
        <ul className="list-disc pl-5 leading-relaxed">
          {topic.subtopics.map((sub, i) => (
            <li key={sub + "-" + i}>{sub}</li>
          ))}
        </ul>

        <h3 className="mb-1 mt-5 font-bold">Сурах зорилго</h3>
        <p className="leading-relaxed">{topic.goal}</p>

        {topic.link && (
          <>
            <h3 className="mb-1 mt-5 font-bold">Үнэгүй материал</h3>
            <a
              href={topic.link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-[#3B82F6] underline"
            >
              {topic.link}
            </a>
          </>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => onToggle(topic.id)}
            className={
              "rounded-md border-2 px-4 py-2 " +
              (isDone
                ? "border-[#16A34A] bg-[#16A34A] text-white"
                : "border-[#EC4899] bg-white hover:bg-[#FCE7F3]")
            }
          >
            {isDone ? "Хийсэн ✓ (дарж болиулах)" : "Хийсэн гэж тэмдэглэх"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#3B82F6] px-4 py-2 text-white hover:bg-[#EC4899]"
          >
            Хаах
          </button>
        </div>
      </aside>
    </div>
  );
}
