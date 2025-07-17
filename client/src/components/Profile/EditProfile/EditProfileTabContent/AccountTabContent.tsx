import { useDispatch } from "react-redux";
import { logout } from "../../../../actions/users.tsx";
import DeleteAccountButton from "../DeleteAccountButton.tsx";

type Props = {
  onClose: () => void;
};

export default function AccountTabContent({ onClose }: Props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div className="flex flex-col h-full gap-4 items-center justify-center">
      <button
        onClick={handleLogout}
        className="text-red-500 border border-red-300 px-4 py-2 rounded"
      >
        Log Out
      </button>
      <DeleteAccountButton />
    </div>
  );
}
