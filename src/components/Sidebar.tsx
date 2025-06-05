import Image from "next/image";
import { CaretRight, Atom, Flask, MathOperations } from "phosphor-react";

const subjects = [
  {
    key: "Physics",
    short: "Phy",
    icon: <Atom size={20} weight="bold" className="text-white" />,
    bg: "bg-[#fe7f1b]",
  },
  {
    key: "Chemistry",
    short: "Chem",
    icon: <Flask size={20} weight="bold" className="text-white" />,
    bg: "bg-[#37b24d]",
  },
  {
    key: "Mathematics",
    short: "Math",
    icon: <MathOperations size={20} weight="bold" className="text-white" />,
    bg: "bg-[#0086ff]",
  },
];

interface SidebarProps {
  active: string;
  setActive: (key: string) => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  return (
    <aside className="w-full md:w-60">
      {/* Logo only on desktop */}
      <div className="hidden md:flex items-center gap-3 px-3 py-6">
        <Image src="/jee-logo.png" alt="JEE Logo" width={32} height={32} />
        <span className="font-inter font-bold text-xl">JEE Main</span>
      </div>

      {/* Tabs: horizontal on mobile, vertical on desktop */}
      <nav className="flex flex-row md:flex-col justify-around md:gap-2 gap-0 px-1">
        {subjects.map((s) => {
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`
                flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center
                gap-1 md:gap-3 px-0 md:px-2 py-2 md:py-3 rounded-none md:rounded-xl text-center transition
                ${isActive
                  ? "bg-[#1D2933] text-white"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white"
                }
                font-inter font-normal text-base leading-6
                w-auto md:w-full
              `}
            >
              {/* Icon with colored background */}
              <span className={`${s.bg} rounded-xl flex items-center justify-center w-8 h-8`}>
                {s.icon}
              </span>
              {/* Mobile: short label below icon */}
              <span className="block md:hidden text-xs font-semibold pt-1">{s.short}</span>
              {/* Desktop: full label right of icon */}
              <span className="hidden md:block">{s.key} PYQs</span>
              {/* Desktop: arrow */}
              <span className="hidden md:block ml-auto">
                <CaretRight
                  size={20}
                  weight="bold"
                  color={isActive ? "#fff" : "#000"}
                />
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
