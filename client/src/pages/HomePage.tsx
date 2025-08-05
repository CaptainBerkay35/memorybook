import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import Slider from "../components/Slider/Slider.tsx";
import InterestSelector from "../components/UserInterest/InterestSelector.tsx";
import SeeMorePrompt from "../components/SeeMore/SeeMore.tsx";
import InfiniteScrollPosts from "../components/InfiniteScroll/InfiniteScrollPosts.tsx";
import RecentPosts from "../components/Posts/Post/RecentPost/RecentPost.tsx";
import { updateUserInterests } from "../actions/interest";
import type { RootState, AppDispatch } from "../store/store.tsx";
import { getPostsByUserInterests } from "../actions/posts";

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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
    }
  }, [dispatch, isLoggedIn, user?.result?._id, user?.result?.interests]);

  const shouldShowInfiniteScroll =
    isLoggedIn && (!hasNoInterests || interestsSaved);

  return (
    <MainLayout>
      {!isLoggedIn && (
        <>
          <Slider />
          <RecentPosts />
          <SeeMorePrompt />
        </>
      )}

      {isLoggedIn && hasNoInterests && !interestsSaved && (
        <InterestSelector onSubmit={handleInterestSubmit} />
      )}

      {shouldShowInfiniteScroll && <InfiniteScrollPosts />}
    </MainLayout>
  );
}
