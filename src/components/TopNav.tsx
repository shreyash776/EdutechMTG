import { ArrowLeft } from "phosphor-react";

export default function TopNav() {
  return (
    <div className="md:hidden relative flex justify-center items-center py-4  bg-white dark:bg-neutral-900">
      
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-1"
        aria-label="Go back"
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={24} weight="bold" className="text-neutral-800 dark:text-neutral-200" />
      </button>
      <span className="font-bold text-lg">JEE Main</span>
    </div>
  );
}
