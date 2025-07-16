import { useState } from "react";
import EditProfileModal from "./EditProfile/EditProfileModal.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { updateUserProfile } from "../../actions/userProfile";
import { EditIcon, ProfileIconEmpty } from "../../assets/icons.tsx";
import ProfileInterest from "./ProfileInterest.tsx";

type Props = {
  name: string;
  profilePicture?: string;
  isOwnProfile: boolean;
  userId: string;
};

export default function ProfileHeader({
  name,
  profilePicture,
  isOwnProfile,
  userId,
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleProfileSave = (updates: {
    nickname?: string;
    profilePicture?: string;
  }) => {
    dispatch(updateUserProfile(userId, updates));
    setShowEditModal(false);
  };

  return (
    <div className="flex">
      
      <div className="flex flex-col items-center text-center ">
        <button
          onClick={() => setShowEditModal(true)}
          className="relative group w-32 h-32 rounded-full overflow-hidden mb-2"
        >
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <ProfileIconEmpty size={42} />
            </div>
          )}

          {isOwnProfile && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <EditIcon size={32} fill="#fff" />
            </div>
          )}
        </button>
        <div className="flex flex-col gap-2 items-center">
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
                  currentProfilePicture={profilePicture}
                  onSave={handleProfileSave}
                  onClose={() => setShowEditModal(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <ProfileInterest></ProfileInterest>
      </div>
    </div>
  );
}
