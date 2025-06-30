import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPostsByUser } from "../actions/posts";
import { getUserProfile } from "../actions/userProfile";
import type { AppDispatch, RootState } from "../store/store";
import MainLayout from "../layout/MainLayout";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePostList from "../components/Profile/ProfilePostList";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const loggedInUser = useSelector((state: RootState) => state.user);
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile
  );
  const userPosts = useSelector((state: RootState) => state.posts.userPosts);

  const userIdToShow = id || loggedInUser?.result?._id;
  const isOwnProfile = id === loggedInUser?.result?._id;

useEffect(() => {
  if (userIdToShow) {
    dispatch({ type: "RESET_USER_POSTS" });
    dispatch(getUserProfile(userIdToShow));
    dispatch(getPostsByUser(userIdToShow));
  }
}, [dispatch, userIdToShow]);

  return (
    <MainLayout>
      {userProfile && (
        <>
          <ProfileHeader
            name={userProfile.nickname}
            isOwnProfile={isOwnProfile}
            userId={userIdToShow}
          />{" "}
          <ProfilePostList posts={userPosts} emptyText="No posts yet." />
        </>
      )}
    </MainLayout>
  );
}
