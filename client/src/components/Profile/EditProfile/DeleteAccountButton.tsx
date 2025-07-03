import { useDispatch ,useSelector} from "react-redux";
import { deleteUserAccount } from "../../../actions/userProfile";
import { useNavigate } from "react-router-dom";
import type { AppDispatch,RootState  } from "../../../store/store";


export default function DeleteAccountButton() {
const dispatch: AppDispatch = useDispatch();
const user = useSelector((state: RootState) => state.user);
const userId = user.result?._id || user._id;
  const navigate = useNavigate();

  const handleDelete =async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      await dispatch(deleteUserAccount(userId));

      navigate("/auth"); 
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete Account
    </button>
  );
}
