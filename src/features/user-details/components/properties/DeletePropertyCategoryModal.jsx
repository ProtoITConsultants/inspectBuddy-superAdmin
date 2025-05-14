import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { userPropertiesAPIs } from "../../api/user-properties";
import { ModalActions, ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";

const DeletePropertyCategoryModal = ({
  isModalOpen,
  onCloseModal,
  categoryData,
}) => {
  // Hooks
  const queryClient = useQueryClient();
  const { userId } = useParams();

  // Delete Property Category - Mutation
  const deletePropertyCategory = useMutation({
    mutationFn: () =>
      userPropertiesAPIs.deletePropertyCategory({
        categoryId: categoryData?.categoryId,
        userId: userId,
      }),
    onSuccess: () => {
      const filtersData = {};
      queryClient.invalidateQueries({
        queryKey: ["userAddedPropertyCategories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["propertiesQuery", filtersData, userId],
      });
      toast.success("Success!", {
        description: `Property Category deleted successfully.`,
        duration: 3000,
        richColors: true,
      });
      onCloseModal();
    },
    onError: (error) => {
      toast.error("Error!", {
        description:
          error?.response?.data?.message || "Error deleting Property Category",
        duration: 3000,
        richColors: true,
      });
    },
  });

  return (
    <ModalRoot
      id="update-property-category-modal"
      loadingOverlay={deletePropertyCategory.isPending}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold md:text-[18px] text-[16px] text-dark-blue mb-[16px]">
          Add Property Category
        </h2>
        <p className="text-gray-500 text-[14px]">
          Are you sure you want to delete this <b>({categoryData?.name})</b>
          &nbsp; category? This action cannot be undone.
        </p>
      </div>
      <ModalActions>
        <Button
          id="confirm-delete-property"
          type="button"
          buttonType="contained"
          onClick={() => deletePropertyCategory.mutate()}
          label="Confirm"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark"
        />
        <Button
          id="cancel-delete-property"
          type="button"
          buttonType="outlined"
          onClick={() => onCloseModal()}
          label="Cancel"
          className="!font-bold"
        />
      </ModalActions>
    </ModalRoot>
  );
};

export default DeletePropertyCategoryModal;
