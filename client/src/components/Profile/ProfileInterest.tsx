import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions/userProfile";
import type { AppDispatch, RootState } from "../../store/store";
import { tagIconMap, defaultTagIcon } from "../../constants/tagIconMap.tsx";

type Props = {
  userId: string;
};

export default function ProfileInterest({ userId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile.profile);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  const interests = userProfile?.interests || [];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.length > 0 ? (
          interests.map((tag: string) => (
            <span
              key={tag}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border border-blue-400"
            >
              <span>{tagIconMap[tag] || defaultTagIcon}</span>
              {tag}
            </span>
          ))
        ) : (
          <p className="text-gray-500">This user hasn't selected any interests yet.</p>
        )}
      </div>
    </div>
  );
}
