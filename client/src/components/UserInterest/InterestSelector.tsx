import { useState } from "react";
import { PREDEFINED_TAGS } from "../../constants/tags";
import { tagIconMap, defaultTagIcon } from "../../constants/tagIconMap";
import type { RootState } from "../../store/store.tsx";
import { useSelector } from "react-redux";

type Props = {
  onSubmit: (interests: string[]) => void;
};

export default function InterestSelector({ onSubmit }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else if (selected.length < 5) {
      setSelected([...selected, tag]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      alert("Please select at least one interest.");
      return;
    }
    onSubmit(selected);
  };

  return (
      <div className="w-full max-w-2xl p-4 bg-white rounded shadow text-center">
        <p className="text-xl font-semibold mb-4">
          Welcome{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent animate-gradient">
            {user?.result.nickname}
          </span>
        </p>

        <h2 className="text-xl font-semibold mb-2">Select Your Interests</h2>
        <p className="text-sm text-gray-500">
          Choose up to 5 topics you're interested in to feed your home page
        </p>
        <p className="text-sm text-gray-500 mb-4">
          You can change your interests on your profile later
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {PREDEFINED_TAGS.map((tag) => {
            const icon = tagIconMap[tag] || defaultTagIcon;

            return (
              <button
                key={tag}
                onClick={() => toggleInterest(tag)}
                type="button"
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition ${
                  selected.includes(tag)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {icon}
                {tag}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center mb-4 gap-2">
          <span className="text-blue-500 text-lg font-semibold">{selected.length}/5</span>
          <span className="text-gray-600">interest selected</span>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Interests
        </button>
      </div>
  );
}
