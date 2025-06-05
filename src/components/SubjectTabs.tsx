
import Image from "next/image";

const subjects = [
  { key: "Physics", icon: "/icons/physics.png" },
  { key: "Chemistry", icon: "/icons/chemistry.png" },
  { key: "Mathematics", icon: "/icons/math.png" },
];

type SubjectTabsProps = {
  active: string;
  setActive: (subject: string) => void;
};

export default function SubjectTabs({ active, setActive }: SubjectTabsProps) {
  return (
    <div className="flex md:flex-col gap-2 md:gap-0 bg-white dark:bg-neutral-900">
      {subjects.map((s) => (
        <button
          key={s.key}
          className={`flex items-center gap-2 px-4 py-2 md:py-4 md:px-6 font-medium transition border-b-2 md:border-b-0 md:border-l-4 ${
            active === s.key
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-neutral-500"
          }`}
          onClick={() => setActive(s.key)}
        >
          <Image src={s.icon} alt={s.key} width={20} height={20} />
          <span>{s.key} PYQs</span>
        </button>
      ))}
    </div>
  );
}
