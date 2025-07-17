import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInterests } from "../../../../actions/interest";
import { getUserProfile } from "../../../../actions/userProfile";
import type { AppDispatch, RootState } from "../../../../store/store";
import { tagIconMap, defaultTagIcon } from "../../../../constants/tagIconMap";
import { PREDEFINED_TAGS } from "../../../../constants/tags";
import ToastSuccess from "../../../Toast/ToastSuccess";

type Props = {
  userId: string;
  onClose: () => void; // Modalı kapatacak fonksiyon
};

export default function InterestsTabContent({ userId, onClose }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const initialInterests = user?.result?.interests || [];

  const [selected, setSelected] = useState<string[]>(initialInterests);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user?.result?.interests) {
      setSelected(user.result.interests);
    }
  }, [user]);

  const toggleInterest = (tag: string) => {
    const isSelected = selected.includes(tag);

    if (isSelected) {
      setSelected((prev) => prev.filter((t) => t !== tag));
    } else {
      if (selected.length >= 5) return;
      setSelected((prev) => [...prev, tag]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await dispatch(updateUserInterests(userId, selected));
    dispatch(getUserProfile(userId));
    setSaving(false);
    setSuccessMessage("Your interests have been updated!");

    setTimeout(() => {
      setSuccessMessage("");
      onClose(); // toast kapanınca modal kapansın
    }, 3000);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="">
      <h2 className="text-md font-semibold mb-3">Your Interests</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {PREDEFINED_TAGS.map((tag) => {
          const isSelected = selected.includes(tag);
          const isDisabled = !isSelected && selected.length >= 5;

          return (
            <button
              key={tag}
              onClick={() => toggleInterest(tag)}
              disabled={isDisabled}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition
                ${
                  isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-blue-400 text-blue-600 hover:bg-blue-100"
                }
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span>{tagIconMap[tag] || defaultTagIcon}</span>
              {tag}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Selected: {selected.length} / 5
      </p>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Interests"}
      </button>

      {successMessage && (
        <ToastSuccess
          message={successMessage}
          duration={3000}
          onClose={() => {
            setSuccessMessage("");
            onClose(); // Toast kapandığında modalı kapat
          }}
        />
      )}
    </div>
  );
}
