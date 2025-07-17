import ImageUpload from "../../../ImageInput/ImageUpload";
import { EditIcon } from "../../../../assets/icons";

type Props = {
  nickname: string;
  profilePicture?: string;
  openEdit: boolean;
  onNicknameChange: (value: string) => void;
  onProfilePictureChange: (base64: string) => void;
  toggleEdit: () => void;
};

export default function ProfileTabContent({
  nickname,
  profilePicture,
  openEdit,
  onNicknameChange,
  onProfilePictureChange,
  toggleEdit,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <ImageUpload
          value={profilePicture || ""}
          onChange={onProfilePictureChange}
        />
      </div>

      <div className="flex items-center justify-between border p-3 rounded-lg bg-gray-50">
        <p className="text-gray-700">
          <span className="font-semibold text-gray-800 mr-1">Nickname:</span>
          {nickname}
        </p>
        <button
          onClick={toggleEdit}
          className="text-blue-500 hover:text-blue-600 transition"
        >
          <EditIcon />
        </button>
      </div>

      {openEdit && (
        <input
          type="text"
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new nickname"
          autoFocus
        />
      )}
    </div>
  );
}
