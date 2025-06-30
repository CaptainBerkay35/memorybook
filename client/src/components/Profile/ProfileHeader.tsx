import { useState } from "react";
import { ProfileIconEmpty } from "../../assets/icons";
import EditProfileModal from "./EditProfileModal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { updateUserNickname } from "../../actions/userProfile";

type Props = {
  name: string;
  isOwnProfile: boolean;
  userId: string;
};

export default function ProfileHeader({ name, isOwnProfile, userId }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleNicknameSave = (newNickname: string) => {
    dispatch(updateUserNickname(userId, newNickname));
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <ProfileIconEmpty />
      </div>
      <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
      {isOwnProfile && (
        <>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
          {showEditModal && (
            <EditProfileModal
              currentNickname={name}
              onSave={handleNicknameSave}
              onClose={() => setShowEditModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
