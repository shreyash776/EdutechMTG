import { Atom, Flask, MathOperations } from "phosphor-react";

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

type SubjectTabsProps = {
  active: string;
  setActive: (subject: string) => void;
};

export default function SubjectTabs({ active, setActive }: SubjectTabsProps) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 border-b-2  border-neutral-200 dark:border-neutral-800">
      <div className="flex justify-evenly md:flex-col gap-2 md:gap-0 ">
        {subjects.map((s) => {
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              type="button"
              className={`
                relative flex flex-col items-center gap-1 px-1 py-2 md:py-4 md:px-6 font-medium transition
                bg-transparent
                ${isActive ? "text-[#0065DE] dark:text-[#0065DE]" : "text-neutral-500"}
              `}
              style={{
                minWidth: "auto",
              }}
              onClick={() => setActive(s.key)}
            >
              <span className={`${s.bg} rounded-xl flex items-center justify-center w-8 h-8 mb-1`}>
                {s.icon}
              </span>
              <span className="block md:hidden">{s.short}</span>
              <span className="hidden md:block">{s.key} PYQs</span>
              
              {isActive && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#0065DE] rounded"></span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* <div className="absolute left-0 right-0 bottom-[4.5] h-[1.5px] bg-neutral-200 dark:bg-neutral-800 z-2" /> */}
    </div>
  );
}
