
import ChapterCard from "./ChapterCard";

type Chapter = {
  chapter: string;
  subject: string;
  yearWiseQuestionCount: number;
  questionSolved: number;
};

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  return (
    <div className="flex flex-col gap-2">
      {chapters.map((ch, idx) => (
        <ChapterCard key={ch.chapter + idx} chapter={ch} />
      ))}
    </div>
  );
}
