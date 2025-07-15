import { useState } from "react";
import { PREDEFINED_TAGS } from "../../constants/tags";

type Props = {
  onSubmit: (interests: string[]) => void;
};

export default function InterestSelector({ onSubmit }: Props) {
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
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Your Interests</h2>
      <p className="text-sm text-gray-500 text-center mb-4">Choose up to 5 topics you're interested in</p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {PREDEFINED_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleInterest(tag)}
            type="button"
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selected.includes(tag)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Interests
        </button>
      </div>
    </div>
  );
}
