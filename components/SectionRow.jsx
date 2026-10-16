import GroupBox from "./GroupBox";

// SVG хэвтээ шугам: GroupBox-оос голын сэдэв рүү (зөвхөн компьютер дээр харагдана)
function HLine() {
  return (
    <svg className="hidden h-2 w-full md:block" aria-hidden="true">
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#93C5FD" strokeWidth="2" />
    </svg>
  );
}

// SVG босоо шугам: нэг сэдвээс дараагийн сэдэв рүү
function VLine() {
  return (
    <div className="flex justify-center">
      <svg className="h-8 w-1" aria-hidden="true">
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#93C5FD" strokeWidth="2" />
      </svg>
    </div>
  );
}

// Roadmap-ийн нэг мөр: [зүүн групп] — [сэдэв] — [баруун групп]
export default function SectionRow({ topic, isSelected, isLast, onSelect, onToggle }) {
  const isDone = topic.status === "done";

  // Дэд сэдвүүдийг зүүн, баруун гэж хоёр хуваана
  const half = Math.ceil(topic.subtopics.length / 2);
  const leftItems = topic.subtopics.slice(0, half);
  const rightItems = topic.subtopics.slice(half);

  const topicClass = isSelected
    ? "border-[#3B82F6] bg-[#3B82F6] text-white"
    : (isDone ? "border-[#16A34A]" : "border-[#3B82F6]") +
      " bg-white text-[#1E293B] hover:border-[#EC4899] hover:bg-[#FCE7F3]";

  const statusClass = isDone
    ? "border-[#16A34A] bg-[#16A34A] text-white"
    : "border-[#EC4899] bg-white text-[#1E293B] hover:bg-[#FCE7F3]";

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[1fr_40px_260px_40px_1fr] md:gap-0">
        {/* Зүүн тал */}
        {leftItems.length > 0 ? (
          <>
            <GroupBox items={leftItems} align="left" className="order-2 md:order-none" />
            <HLine />
          </>
        ) : (
          <>
            <div className="hidden md:block" />
            <div className="hidden md:block" />
          </>
        )}

        {/* Голын сэдэв + төлөв товч */}
        <div className="order-1 flex flex-col gap-1.5 md:order-none">
          <button
            type="button"
            onClick={() => onSelect(topic.id)}
            className={"rounded-md border-2 px-3 py-2.5 text-[15px] " + topicClass}
          >
            {topic.id}. {topic.title}
            {isDone && <span className="font-bold"> ✓</span>}
          </button>
          <button
            type="button"
            aria-pressed={isDone}
            onClick={() => onToggle(topic.id)}
            className={"rounded-md border-2 px-2.5 py-1.5 text-[13px] " + statusClass}
          >
            {isDone ? "Хийсэн" : "Хийгээгүй"}
          </button>
        </div>

        {/* Баруун тал */}
        {rightItems.length > 0 ? (
          <>
            <HLine />
            <GroupBox items={rightItems} align="right" className="order-3 md:order-none" />
          </>
        ) : (
          <>
            <div className="hidden md:block" />
            <div className="hidden md:block" />
          </>
        )}
      </div>

      {!isLast && <VLine />}
    </div>
  );
}
