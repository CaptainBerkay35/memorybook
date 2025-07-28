import React, { useState } from "react";
import ImageUpload from "../../../ImageInput/ImageUpload";
import { EditIcon, DeletePhoto } from "../../../../assets/icons";
import ToastSuccess from "../../../../components/Toast/ToastSuccess";

type Props = {
  nickname: string;
  profilePicture?: string;
  openEdit: boolean;
  onNicknameChange: (value: string) => void;
  onProfilePictureChange: (base64: string) => void;
  toggleEdit: () => void;
  successMessage: string;
  onToastClose: () => void;
};

export default function ProfileTabContent({
  nickname,
  profilePicture,
  openEdit,
  onNicknameChange,
  onProfilePictureChange,
  toggleEdit,
  successMessage,
  onToastClose,
}: Props) {
  const [nicknameError, setNicknameError] = useState("");

  const handleDeletePhoto = () => {
    onProfilePictureChange("");
  };

  const handleNicknameChange = (value: string) => {
    if (value.length > 20) {
      setNicknameError("Nickname en fazla 20 karakter olabilir.");
    } else {
      setNicknameError("");
    }
    onNicknameChange(value);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col items-center relative">
        <ImageUpload
          value={profilePicture || ""}
          onChange={onProfilePictureChange}
        />

        {profilePicture && (
          <button
            onClick={handleDeletePhoto}
            className="absolute top-1 right-1 bg-red-500 p-1 rounded-full hover:bg-red-600 transition"
            title="Fotoğrafı Sil"
          >
            <DeletePhoto size={20} />
          </button>
        )}
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
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => handleNicknameChange(e.target.value)}
            maxLength={20}
            className={"w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 "}
            placeholder="Enter new nickname"
            autoFocus
          />
       
        </div>
      )}

      {successMessage && (
        <ToastSuccess
          message={successMessage}
          duration={3000}
          onClose={onToastClose}
        />
      )}
    </div>
  );
}
