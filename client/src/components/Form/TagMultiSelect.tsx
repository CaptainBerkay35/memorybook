import { useState } from "react";
import { PREDEFINED_TAGS } from "../../constants/tags.tsx";

type Props = {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
};

export default function TagsMultiSelect({ selectedTags, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      onChange([...selectedTags, tag]);
    }
    setOpen(false);
  };
  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="border cursor-pointer flex flex-wrap gap-2"
      >
        {selectedTags.length === 0 && (
          <span className="text-gray-400 block items-center ml-2 select-none py-1">
            Select tags...
          </span>
        )}

        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-500 text-white rounded-md px-2 py-1 text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleTag(tag);
              }}
              className="ml-1 text-white hover:text-gray-200 focus:outline-none text-base"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {open && (
        <div className="border border-gray-400 rounded-md mt-1 max-h-40 overflow-y-auto bg-white shadow-md z-10 absolute w-full">
          {PREDEFINED_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            const isDisabled = !isSelected && selectedTags.length >= 3;
            return (
              <div
                key={tag}
                className={`cursor-pointer px-2 py-1 hover:bg-gray-200 ${
                  isSelected ? "bg-blue-100" : ""
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (!isDisabled) toggleTag(tag);
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
