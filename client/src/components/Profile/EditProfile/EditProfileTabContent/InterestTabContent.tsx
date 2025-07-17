import ProfileInterest from "../../ProfileInterest";

type Props = {
  userId: string;
};

export default function InterestsTabContent({ userId }: Props) {
  return (
    <div>
      <ProfileInterest userId={userId} paddingClass="0" font="text-md"/>
    </div>
  );
}
