import { useState } from "react";

type Props = {
  currentNickname: string;
  onSave: (newNickname: string) => void;
  onClose: () => void;
};

export default function EditProfileModal({ currentNickname, onSave, onClose }: Props) {
  const [nickname, setNickname] = useState(currentNickname);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Nickname</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={() => onSave(nickname)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
