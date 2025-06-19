import { ProfileIconEmpty } from "../../assets/icons";

type Props = {
  name: string;
  isOwnProfile: boolean;
};

export default function ProfileHeader({ name, isOwnProfile }: Props) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <ProfileIconEmpty />
      </div>
      <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
      {isOwnProfile && (
        <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit Profile
        </button>
      )}
    </div>
  );
}

