import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import Posts from "../components/Posts/Posts.tsx";
import Slider from "../components/Slider/Slider.tsx";
import InterestSelector from "../components/UserInterest/InterestSelector.tsx";
import type { RootState, AppDispatch } from "../store/store.tsx";
import { getPostsByUserInterests, getPosts } from "../actions/posts";
import { updateUserInterests } from "../actions/interest";

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const posts = useSelector((state: RootState) => state.posts.filteredByInterests);
  const [interestsSaved, setInterestsSaved] = useState(false);

  const isLoggedIn = !!user?.result;
  const hasNoInterests = user?.result?.interests?.length === 0;

  const handleInterestSubmit = async (interests: string[]) => {
    if (!user?.result?._id) return;
    await dispatch(updateUserInterests(user.result._id, interests));
    setInterestsSaved(true);
  };

  useEffect(() => {
  if (isLoggedIn && user.result.interests?.length) {
    dispatch(getPostsByUserInterests(user.result._id));
  } else {
    dispatch(getPosts());
  }
}, [dispatch, isLoggedIn, user?.result?._id, user?.result?.interests]);


  return (
    <MainLayout>
      {!isLoggedIn && <Slider />}

      {isLoggedIn && hasNoInterests && !interestsSaved && (
        <InterestSelector onSubmit={handleInterestSubmit} />
      )}

      {(isLoggedIn && (!hasNoInterests || interestsSaved)) || !isLoggedIn ? (
        <Posts posts={isLoggedIn ? posts : undefined} />
      ) : null}
    </MainLayout>
  );
}
