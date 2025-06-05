import { Atom, Flask, Function } from "phosphor-react";

interface Chapter {
  chapter: string;
  subject: string;
  yearWiseQuestionCount: Record<string, number>;
  questionSolved: number;
}

const subjectIcons: Record<string, JSX.Element> = {
  physics: <Atom size={22} weight="bold" className="text-[#fe7f1b]" />,
  chemistry: <Flask size={22} weight="bold" className="text-[#37b24d]" />,
  mathematics: <Function size={22} weight="bold" className="text-[#0086ff]" />,
};

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "..." : str;
}

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const years = Object.keys(chapter.yearWiseQuestionCount).sort();
  const latestYear = years[years.length - 1];
  const latestCount = chapter.yearWiseQuestionCount[latestYear];
  const prevYear = years[years.length - 2];
  const prevCount = chapter.yearWiseQuestionCount[prevYear];

  return (
    <div className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 rounded-xl mb-2 md:mb-4 md:border md:shadow-sm">
      {/* Left section: icon + chapter name + (mobile: year info below) */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          {subjectIcons[chapter.subject.toLowerCase()]}
          {/* Mobile: truncated chapter name */}
          <span
            className="font-inter block md:hidden truncate"
            style={{
              fontWeight: "var(--font-label-base-font_weight, 400)",
              fontSize: "var(--font-label-base-font_size, 16px)",
              lineHeight: "var(--font-label-base-line_height, 24px)",
              letterSpacing: "0%",
              maxWidth: "140px",
            }}
          >
            {truncate(chapter.chapter, 28)}
          </span>
          {/* Desktop: full chapter name */}
          <span
            className="font-inter hidden md:block"
            style={{
              fontWeight: "var(--font-label-base-font_weight, 400)",
              fontSize: "var(--font-label-base-font_size, 16px)",
              lineHeight: "var(--font-label-base-line_height, 24px)",
              letterSpacing: "0%",
            }}
          >
            {chapter.chapter}
          </span>
        </div>
        {/* Mobile: year info below chapter name */}
        <div className="flex md:hidden gap-3 mt-1 text-xs text-neutral-500 pl-11">
          <span>
            {latestYear}: {latestCount}Qs |
          </span>
          <span>
            {prevYear}: {prevCount}Qs
          </span>
        </div>
      </div>
      {/* Mobile: solved count at right */}
      <span className="block md:hidden text-neutral-500 text-xs font-medium pl-2 flex-shrink-0">
        {chapter.questionSolved}/250
      </span>
      {/* Desktop: show full info */}
      <div className="hidden md:flex gap-4 text-xs text-neutral-500 flex-shrink-0">
        <span>
          {latestYear}: {latestCount}Qs |
        </span>
        <span>
          {prevYear}: {prevCount}Qs
        </span>
        <span>{chapter.questionSolved}/250</span>
      </div>
    </div>
  );
}
