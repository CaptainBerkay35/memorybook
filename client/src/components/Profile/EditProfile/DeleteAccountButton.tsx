import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount } from "../../../actions/userProfile";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store/store";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

export default function DeleteAccountButton() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const userId = user?.result?._id || user?._id;
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = async () => {
    if (!userId) return; 
    await dispatch(deleteUserAccount(userId));
    setShowDeleteModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Account
      </button>

      <ConfirmModal
        isOpen={showDeleteModal}
        text="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        toastMessage="Account deleted successfully!"
      />

    </>
  );
}
