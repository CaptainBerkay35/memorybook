import { useState } from "react";
import { EditIcon } from "../../../assets/icons";
import DeleteAccountButton from "./DeleteAccountButton.tsx";
import ImageUpload from "../../ImageInput/ImageUpload.tsx";

type Props = {
  currentNickname: string;
  currentProfilePicture?: string;
  onSave: (updates: { nickname?: string; profilePicture?: string }) => void;
  onClose: () => void;
};

export default function EditProfileModal({
  currentNickname,
  currentProfilePicture,
  onSave,
  onClose,
}: Props) {
  const [nickname, setNickname] = useState(currentNickname);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    currentProfilePicture
  );
  const [openEdit, setOpenEdit] = useState(false);

  function openEditFunction() {
    setOpenEdit(true);
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <ImageUpload
          value={profilePicture || ""}
          onChange={(base64) => setProfilePicture(base64)}
        />

        <div className="flex gap-2 items-center justify-center mb-2">
          <p>{nickname}</p>
          <button onClick={openEditFunction}>
            <EditIcon />
          </button>
        </div>

        {openEdit && (
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Nickname"
            autoFocus
          />
        )}

        <div className="my-4 border-t pt-4">
          <DeleteAccountButton />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave({ nickname, profilePicture })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
