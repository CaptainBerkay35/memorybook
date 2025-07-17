import { useState, useEffect } from "react";
import ProfileTabContent from "./EditProfileTabContent/ProfileTabContent.tsx";
import InterestsTabContent from "./EditProfileTabContent/InterestTabContent.tsx";
import AccountTabContent from "./EditProfileTabContent/AccountTabContent.tsx";

type Props = {
  currentNickname: string;
  currentProfilePicture?: string;
  currentInterests?: string[];
  onSave: (updates: {
    nickname?: string;
    profilePicture?: string;
    interests?: string[];
  }) => void;
  onClose: () => void;
  userId: string;
};

const tabs = ["Profile", "Interests", "Account"] as const;
type Tab = (typeof tabs)[number];

export default function EditProfileModal({
  currentNickname,
  currentProfilePicture,
  onSave,
  onClose,
  userId,
}: Props) {
  const [nickname, setNickname] = useState(currentNickname);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    currentProfilePicture
  );
  const [openEdit, setOpenEdit] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const nicknameChanged = nickname !== currentNickname;
    const profilePicChanged = profilePicture !== currentProfilePicture;

    setIsDirty(nicknameChanged || profilePicChanged);
  }, [nickname, profilePicture]);

  const handleSave = () => {
    onSave({ nickname, profilePicture });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-4 w-full max-w-md h-[320px] flex flex-col"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        {/* Tabs */}
        <div className="flex mb-2 border-b items-center justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "Profile" && (
            <ProfileTabContent
              nickname={nickname}
              profilePicture={profilePicture}
              openEdit={openEdit}
              onNicknameChange={setNickname}
              onProfilePictureChange={setProfilePicture}
              toggleEdit={() => setOpenEdit(!openEdit)}
            />
          )}
          {activeTab === "Interests" && <InterestsTabContent userId={userId} />}
          {activeTab === "Account" && <AccountTabContent onClose={onClose} />}
        </div>

        {isDirty && (activeTab === "Profile" || activeTab === "Interests") && (
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
