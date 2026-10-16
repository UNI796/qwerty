import TopicTag from "./TopicTag";

// Дэд сэдвүүдийг нэг хүрээнд бүлэглэнэ.
// align: "left" бол зүүн талд (баруун тийш налуу), "right" бол баруун талд.
export default function GroupBox({ items, align, className = "" }) {
  const alignClass =
    align === "left" ? "md:items-end" : "md:items-start";

  return (
    <div
      className={
        "flex flex-wrap justify-center gap-2 rounded-lg border-2 border-[#93C5FD] bg-white p-2 md:flex-col md:flex-nowrap " +
        alignClass +
        " " +
        className
      }
    >
      {items.map((item, i) => (
        <TopicTag key={item + "-" + i} label={item} />
      ))}
    </div>
  );
}
