import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import Posts from "../components/Posts/Posts.tsx";
import Slider from "../components/Slider/Slider.tsx";
import InterestSelector from "../components/UserInterest/InterestSelector.tsx";
import type { RootState } from "../store/store.tsx";
import { updateUserInterests } from "../actions/interest";

export default function HomePage() {
const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.user);
  const [interestsSaved, setInterestsSaved] = useState(false);

  const handleInterestSubmit = async (interests: string[]) => {
    if (!user?.result?._id) return;

    await dispatch(updateUserInterests(user.result._id, interests));
    setInterestsSaved(true);
  };

  const isLoggedIn = !!user;
  const hasNoInterests = user?.result?.interests?.length === 0;

  return (
    <MainLayout>
      {/* Giriş yapılmamışsa slider göster */}
      {!isLoggedIn && <Slider />}

      {/* Giriş yapılmış ama ilgi alanı seçilmemişse InterestSelector göster */}
      {isLoggedIn && hasNoInterests && !interestsSaved && (
        <InterestSelector onSubmit={handleInterestSubmit} />
      )}

      {/* Giriş yapılmış ve ilgi alanı varsa Posts göster */}
      {isLoggedIn && (!hasNoInterests || interestsSaved) && <Posts />}
    </MainLayout>
  );
}
