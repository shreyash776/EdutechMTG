
import { ArrowDownAZ } from "lucide-react";

interface SortBarProps {
  count: number;
  onSort: () => void;
}

export default function SortBar({ count, onSort }: SortBarProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-neutral-500">Showing all chapters ({count})</span>
      <button className="flex items-center gap-1 text-sm text-blue-600 font-medium" onClick={onSort}>
        <ArrowDownAZ size={16} />
        Sort
      </button>
    </div>
  );
}
