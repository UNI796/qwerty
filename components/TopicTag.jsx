// Нэг дэд сэдвийн жижиг шошго (дарагддаггүй тул hover эффектгүй)
export default function TopicTag({ label }) {
  return (
    <span className="rounded-md bg-[#DBEAFE] px-2.5 py-1 text-[13px] text-[#1E293B]">
      {label}
    </span>
  );
}
