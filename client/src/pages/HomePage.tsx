import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import Posts from "../components/Posts/Posts.tsx";
import Slider from "../components/Slider/Slider.tsx";
import InterestSelector from "../components/UserInterest/InterestSelector.tsx";
import type { RootState, AppDispatch } from "../store/store.tsx";
import { getPostsByUserInterests, getRecentPosts } from "../actions/posts";
import { updateUserInterests } from "../actions/interest";
import SeeMorePrompt from "../components/SeeMore/SeeMore.tsx";
import LoadingSpinner from "../components/Loading/LoadingSpinner.tsx";


export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const filteredPosts = useSelector(
    (state: RootState) => state.posts.filteredByInterests
  );
  const recentPosts = useSelector(
    (state: RootState) => state.posts.recentPosts
  );
  const [interestsSaved, setInterestsSaved] = useState(false);
  const isLoading = useSelector((state: RootState) => state.posts.isLoading);

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
      dispatch(getRecentPosts());
    }
  }, [dispatch, isLoggedIn, user?.result?._id, user?.result?.interests]);

  const postsToShow = isLoggedIn ? filteredPosts : recentPosts;

  const shouldShowPosts =
    (isLoggedIn && (!hasNoInterests || interestsSaved)) || !isLoggedIn;

 return (
  <MainLayout>
    {!isLoggedIn && <Slider />}

    {isLoggedIn && hasNoInterests && !interestsSaved && (
      <InterestSelector onSubmit={handleInterestSubmit} />
    )}

    {isLoading ? (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    ) : (
      shouldShowPosts && (
        <>
          <Posts posts={postsToShow} isLoading={isLoading} />
          {!isLoggedIn && <SeeMorePrompt />}
        </>
      )
    )}
  </MainLayout>
);
}
