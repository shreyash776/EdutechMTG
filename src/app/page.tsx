"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setActiveSubject,
  setClass,
  setUnit,
  toggleNotStarted,
  toggleWeakChapters,
} from "@/store/chaptersSlice";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import SubjectTabs from "@/components/SubjectTabs";
import FilterBar from "@/components/FilterBar";
import SortBar from "@/components/SortBar";
import ChapterList from "@/components/ChapterList";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Atom, Flask, MathOperations } from "phosphor-react";

const subjects = ["Physics", "Chemistry", "Mathematics"] as const;
type Subject = typeof subjects[number];

const subjectMeta: Record<Subject, { icon: React.ReactElement; bg: string }> = {
  Physics: {
    icon: <Atom size={20} weight="bold" className="text-white" />,
    bg: "bg-[#fe7f1b]",
  },
  Chemistry: {
    icon: <Flask size={20} weight="bold" className="text-white" />,
    bg: "bg-[#37b24d]",
  },
  Mathematics: {
    icon: <MathOperations size={20} weight="bold" className="text-white" />,
    bg: "bg-[#0086ff]",
  },
};

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    activeSubject,
    selectedClass,
    selectedUnit,
    notStarted,
    weakChapters,
    chapters,
  } = useSelector((state: RootState) => state.chapters);
  const [sortAsc, setSortAsc] = React.useState(true);

  // Filtering logic
  let filteredChapters = chapters.filter((ch) => ch.subject === activeSubject);
  if (selectedClass) filteredChapters = filteredChapters.filter((ch) => ch.class === selectedClass);
  if (selectedUnit) filteredChapters = filteredChapters.filter((ch) => ch.unit === selectedUnit);
  if (notStarted) filteredChapters = filteredChapters.filter((ch) => ch.status === "Not Started");
  if (weakChapters) filteredChapters = filteredChapters.filter((ch) => ch.isWeakChapter);

  filteredChapters = filteredChapters.sort((a, b) =>
    sortAsc ? a.chapter.localeCompare(b.chapter) : b.chapter.localeCompare(a.chapter)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex justify-center">
      <div className="flex w-full max-w-[1120px]">
        <div className="hidden md:block w-[272px]">
          <Sidebar
            active={activeSubject}
            setActive={(subj) => dispatch(setActiveSubject(subj))}
          />
        </div>
        <main className="flex-1 w-full md:w-[848px] mx-auto flex flex-col min-h-screen md:border-l md:border-r border-neutral-200 dark:border-neutral-800 px-0 md:px-4">
         
          <div className="md:hidden">
            <TopNav />
            <SubjectTabs
              active={activeSubject}
              setActive={(subj) => dispatch(setActiveSubject(subj))}
            />
          </div>
          
          <div className="hidden md:flex items-center justify-center relative mt-8 mb-2">
            <div className="flex items-center gap-3">
              <span className={`${subjectMeta[activeSubject as Subject].bg} rounded-xl flex items-center justify-center w-8 h-8`}>
                {subjectMeta[activeSubject as Subject].icon}
              </span>
              <h1 className="text-2xl font-bold">{activeSubject} PYQs</h1>
            </div>
            <div className="absolute right-0">
              <DarkModeToggle />
            </div>
          </div>
          <div className="text-center mt-2 mb-4 text-neutral-500 hidden md:block">
            Chapter-wise collection of {activeSubject.toLowerCase()} pyqs
          </div>
          <div className="px-2 md:px-0">
            <FilterBar
             
            />
            <SortBar count={filteredChapters.length} onSort={() => setSortAsc((s) => !s)} />
          </div>
          <div className="px-2 md:px-0">
            <ChapterList chapters={filteredChapters} />
          </div>
        </main>
      </div>
    </div>
  );
}
