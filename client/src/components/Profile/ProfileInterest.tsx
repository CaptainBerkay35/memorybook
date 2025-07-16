import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.tsx";

export default function ProfileInterest() {
  const user = useSelector((state: RootState) => state.user);
  const userInterests = user?.result?.interests;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {userInterests && userInterests.length > 0 ? (
          userInterests.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-300"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-gray-500">You haven't selected any interests yet.</p>
        )}
      </div>
    </div>
  );
}
