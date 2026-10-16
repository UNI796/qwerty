"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SectionRow from "./SectionRow";
import Drawer from "./Drawer";

export default function Roadmap() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [savingIds, setSavingIds] = useState([]); // хадгалж байгаа сэдвүүд
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Бүгд");

  // 1. Хуудас нээгдэхэд Supabase-ээс сэдвүүдийг унших
  useEffect(() => {
    let cancelled = false;

    async function loadTopics() {
      if (!supabase) {
        setError("Supabase тохиргоо олдсонгүй. .env.local файлаа шалгана уу.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .order("position");

      if (cancelled) return;
      if (error) setError(error.message);
      else setTopics(data);
      setLoading(false);
    }
    loadTopics();

    return () => {
      cancelled = true;
    };
  }, []);

  function setStatus(id, status) {
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  // 2. Хийсэн / Хийгээгүй солих, database-д хадгалах
  async function toggleDone(id) {
    if (!supabase || savingIds.includes(id)) return; // давхар дарахаас сэргийлнэ
    const topic = topics.find((t) => t.id === id);
    if (!topic) return;

    const oldStatus = topic.status;
    const newStatus = oldStatus === "done" ? "todo" : "done";

    setSaveError("");
    setSavingIds((prev) => [...prev, id]);
    setStatus(id, newStatus); // эхлээд дэлгэц дээр шууд өөрчилнө

    const { data, error } = await supabase
      .from("topics")
      .update({ status: newStatus })
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      setStatus(id, oldStatus); // амжилтгүй бол буцаана
      setSaveError("Хадгалж чадсангүй. " + (error ? error.message : "Эрхээ (RLS) шалгана уу."));
    }
    setSavingIds((prev) => prev.filter((x) => x !== id));
  }

  const closeDrawer = useCallback(() => setSelectedId(null), []);

  // 3. Гүйцэтгэл
  const total = topics.length;
  const doneCount = topics.filter((t) => t.status === "done").length;
  const remaining = total - doneCount;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  // 4. Хайлт ба ангиллын шүүлтүүр
  const categories = ["Бүгд", ...new Set(topics.map((t) => t.category))];
  const q = search.trim().toLowerCase();
  const visibleTopics = topics.filter((t) => {
    const matchCategory = category === "Бүгд" || t.category === category;
    const matchSearch =
      q === "" ||
      t.title.toLowerCase().includes(q) ||
      t.subtopics.some((s) => s.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  const selectedTopic = topics.find((t) => t.id === selectedId);

  return (
    // Дэвсгэр өнгө бүх дэлгэцийг хамрана (өмнө нь зөвхөн голын багананд байсан)
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6">
        <h1 className="mb-2 text-3xl font-bold">Machine Learning Roadmap</h1>
        <p className="mb-6 leading-relaxed">
          Machine Learning-ийн үндсэн сэдвүүдийг дарааллаар судалж, суралцах явцаа тэмдэглээрэй.
        </p>

        <section className="mb-6 rounded-lg border border-[#DBEAFE] bg-white p-4">
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2">
            <span>Нийт: <b>{total}</b></span>
            <span>Хийсэн: <b>{doneCount}</b></span>
            <span>Үлдсэн: <b>{remaining}</b></span>
            <span>Гүйцэтгэл: <b>{percent}%</b></span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-md bg-[#DBEAFE]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div className="h-full bg-[#3B82F6]" style={{ width: percent + "%" }} />
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Сэдэв хайх..."
            aria-label="Сэдэв хайх"
            className="w-full rounded-md border-2 border-[#DBEAFE] bg-white px-3 py-2 outline-none focus:border-[#3B82F6]"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCategory(c)}
                className={
                  "rounded-md border-2 px-3 py-1.5 text-sm " +
                  (category === c
                    ? "border-[#3B82F6] bg-[#3B82F6] text-white"
                    : "border-[#EC4899] bg-white hover:bg-[#FCE7F3]")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {loading && <p>Ачаалж байна...</p>}
        {error && (
          <p className="rounded-md border-2 border-[#EC4899] bg-[#FCE7F3] p-3">
            Алдаа: {error}
          </p>
        )}
        {saveError && (
          <p className="mb-4 rounded-md border-2 border-[#EC4899] bg-[#FCE7F3] p-3">
            {saveError}
          </p>
        )}
        {!loading && !error && visibleTopics.length === 0 && <p>Сэдэв олдсонгүй.</p>}

        <section>
          {visibleTopics.map((topic, index) => (
            <SectionRow
              key={topic.id}
              topic={topic}
              isSelected={topic.id === selectedId}
              isLast={index === visibleTopics.length - 1}
              onSelect={setSelectedId}
              onToggle={toggleDone}
            />
          ))}
        </section>

        <Drawer topic={selectedTopic} onClose={closeDrawer} onToggle={toggleDone} />
      </main>
    </div>
  );
}
