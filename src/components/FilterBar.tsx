"use client";
import { CaretDown, CaretRight } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setClass, setUnit, toggleNotStarted, toggleWeakChapters } from "@/store/chaptersSlice";
import { useState, useRef } from "react";
import Portal from "@/components/Portal";
  import { useEffect } from "react";

export default function FilterBar() {
  const dispatch = useDispatch();
  const {
    chapters,
    activeSubject,
    selectedClass,
    selectedUnit,
    notStarted,
    weakChapters,
  } = useSelector((state: RootState) => state.chapters);

  const classOptions = Array.from(
    new Set(chapters.filter(ch => ch.subject === activeSubject).map(ch => ch.class))
  ).sort();

  const unitOptions = Array.from(
    new Set(chapters.filter(ch => ch.subject === activeSubject).map(ch => ch.unit))
  ).sort();

  const [openClass, setOpenClass] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [classDropdownPos, setClassDropdownPos] = useState({ left: 0, top: 0, width: 0 });
  const [unitDropdownPos, setUnitDropdownPos] = useState({ left: 0, top: 0, width: 0 });

  const classBtnRef = useRef<HTMLButtonElement>(null);
  const unitBtnRef = useRef<HTMLButtonElement>(null);

// Ref for the scrollable container
const scrollRef = useRef<HTMLDivElement>(null);

const handleOpenClass = (e: React.MouseEvent) => {
  e.stopPropagation();
  setOpenClass((o) => !o);
  setOpenUnit(false);
  if (classBtnRef.current) {
    const rect = classBtnRef.current.getBoundingClientRect();
    setClassDropdownPos({ left: rect.left, top: rect.bottom + window.scrollY, width: rect.width });
  }
};

const handleOpenUnit = (e: React.MouseEvent) => {
  e.stopPropagation();
  setOpenUnit((o) => !o);
  setOpenClass(false);
  if (unitBtnRef.current) {
    const rect = unitBtnRef.current.getBoundingClientRect();
    setUnitDropdownPos({ left: rect.left, top: rect.bottom + window.scrollY, width: rect.width });
  }
};

// Scroll right when arrow is clicked (mobile only)
const handleScrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: 120, behavior: "smooth" });
  }
};

useEffect(() => {
  function handleClick() {
    setOpenClass(false);
    setOpenUnit(false);
  }
  if (openClass || openUnit) {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }
}, [openClass, openUnit]);

// Design token style
const filterTextStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "var(--font-label-base-font_weight, 400)",
  fontSize: "var(--font-label-md-font_size, 14px)",
  lineHeight: "var(--font-label-md-line_height, 22px)",
  letterSpacing: "0%",
};

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-4 relative z-20"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Class filter dropdown */}
        <div className="relative flex-shrink-0">
          <button
            ref={classBtnRef}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap transition
              ${selectedClass
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-white dark:bg-neutral-800"}
            `}
            style={filterTextStyle}
            onClick={handleOpenClass}
          >
            <span>{selectedClass ? `Class: ${selectedClass}` : "Class"}</span>
            <CaretDown size={16} />
          </button>
          {openClass && (
            <Portal>
              <div
                className="fixed bg-white dark:bg-neutral-900 border rounded shadow z-[9999] w-auto py-1"
                style={{
                  left: classDropdownPos.left,
                  top: classDropdownPos.top,
                  minWidth: classDropdownPos.width,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {classOptions.map((cls) => (
                  <div
                    key={cls}
                    className={`px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                      selectedClass === cls ? "font-bold" : ""
                    }`}
                    style={filterTextStyle}
                    onClick={() => {
                      dispatch(setClass(cls));
                      setOpenClass(false);
                    }}
                  >
                    {cls}
                  </div>
                ))}
                <div
                  className="px-4 py-2 cursor-pointer text-neutral-400 whitespace-nowrap"
                  style={filterTextStyle}
                  onClick={() => {
                    dispatch(setClass(undefined));
                    setOpenClass(false);
                  }}
                >
                  Clear
                </div>
              </div>
            </Portal>
          )}
        </div>

      

        {/* Units filter dropdown */}
        <div className="relative flex-shrink-0">
          <button
            ref={unitBtnRef}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap transition
              ${selectedUnit
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-white dark:bg-neutral-800"}
            `}
            style={filterTextStyle}
            onClick={handleOpenUnit}
          >
            <span>{selectedUnit ? `Unit: ${selectedUnit}` : "Units"}</span>
            <CaretDown size={16} />
          </button>
          {openUnit && (
            <Portal>
              <div
                className="fixed bg-white dark:bg-neutral-900 border rounded shadow z-[9999] w-auto py-1"
                style={{
                  left: unitDropdownPos.left,
                  top: unitDropdownPos.top,
                  minWidth: unitDropdownPos.width,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {unitOptions.map((unit) => (
                  <div
                    key={unit}
                    className={`px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                      selectedUnit === unit ? "font-bold" : ""
                    }`}
                    style={filterTextStyle}
                    onClick={() => {
                      dispatch(setUnit(unit));
                      setOpenUnit(false);
                    }}
                  >
                    {unit}
                  </div>
                ))}
                <div
                  className="px-4 py-2 cursor-pointer text-neutral-400 whitespace-nowrap"
                  style={filterTextStyle}
                  onClick={() => {
                    dispatch(setUnit(undefined));
                    setOpenUnit(false);
                  }}
                >
                  Clear
                </div>
              </div>
            </Portal>
          )}
        </div>
          {/* Separator */}
        <div className="hidden sm:flex items-center">
          <span className="text-neutral-300 text-lg select-none px-1">|</span>
        </div>


        {/* Not Started filter */}
        <button
          className={`px-4 py-2 rounded-lg border whitespace-nowrap transition flex-shrink-0
            ${notStarted
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-white dark:bg-neutral-800"}
          `}
          style={filterTextStyle}
          onClick={() => dispatch(toggleNotStarted())}
        >
          Not Started
        </button>

        {/* Weak Chapters filter */}
        <button
          className={`px-4 py-2 rounded-lg border whitespace-nowrap transition flex-shrink-0
            ${weakChapters
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-white dark:bg-neutral-800"}
          `}
          style={filterTextStyle}
          onClick={() => dispatch(toggleWeakChapters())}
        >
          Weak Chapters
        </button>
      </div>

      {/* Mobile right arrow for scrolling */}
      <button
        className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 py-2 px-1 "
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)",
          boxShadow: "4px 4px 8px rgba(0,0,1,0.08)",
        }}
        aria-label="Scroll filters right"
        onClick={handleScrollRight}
      >
        <CaretRight size={24} className="text-neutral-400" />
      </button>

      {/* Hide scrollbar visually */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
