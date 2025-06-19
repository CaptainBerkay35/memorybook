interface Props {
  postCount: number;
}

export default function ProfileTabs({
  postCount,
}: Props) {
  return (
    <ul className="flex justify-center items-center gap-6 text-gray-600 font-medium text-sm md:text-base">
      <li
        className={`relative cursor-pointer transition duration-300 ease-in-out transform 
       `}
      >
        Posts
        <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
          {postCount}
        </span>
      </li>
    </ul>
  );
}
