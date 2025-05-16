import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SubUserDetailsSkeleton from "../../../../features/user-details/components/sub-users/details/SubUserDetailsSkeleton";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import { MultiSelect, TextInput } from "@mantine/core";
import {
  SubUserActions,
  SubUserFormGrid,
  SubUserPhoneNumber,
} from "../../../../features/user-details/components/sub-users/details/EditDetailsForm";
import Button from "../../../../components/ui/Button";
import { SwitchItem } from "../../../../features/user-details/components/sub-users/details/ViewDetailsForm";
import useUserAddedPropertyCategories from "../../../../hooks/useUserAddedPropertyCategories";
import { userDetailsAPIs } from "../../../../features/user-details/api";

const AddNewSubUser = () => {
  // Hooks
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // Sub User Details - Form
  const subUserDetailsForm = useForm({
    initialValues: {
      userName: "",
      userEmail: "",
      userAddress: "",
      userPhoneNumber: "",
      assignedCategories: [],
      allowStartFromScratch: false,
      allowCreateNewQuestions: false,
    },

    validate: (values) => {
      return {
        userName:
          values.userName.length < 4
            ? "User Name should be atleast 4 characters"
            : null,
        userEmail: !values.userEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
          ? "User Email is not Valid!"
          : null,
        userAddress:
          values.userAddress.length < 10
            ? "User Address should be atleast 10 characters"
            : null,
        userPhoneNumber:
          values.userPhoneNumber.replace(/[\s()-]/g, "").length < 11
            ? "User Phone Number is not Valid!"
            : null,
      };
    },
  });

  // Create Sub User - Mutation
  const createSubUser = useMutation({
    mutationFn: () => {
      const assignedCategories = USER_ADDED_PROPERTY_CATEGORIES.filter(
        (category) => {
          return subUserDetailsForm.values.assignedCategories.includes(
            category.value
          );
        }
      ).map((category) => category._id);

      const subUserDetails = {
        name: subUserDetailsForm.values.userName,
        email: subUserDetailsForm.values.userEmail,
        address: subUserDetailsForm.values.userAddress,
        phoneNumber: subUserDetailsForm.values.userPhoneNumber.replace(
          /^\+|[\s()-]/g,
          ""
        ),
        canCreateInspectionQuestions:
          subUserDetailsForm.values.allowCreateNewQuestions,
        canInspectFromScratch: subUserDetailsForm.values.allowStartFromScratch,
        assignedCategories: assignedCategories,
      };

      return userDetailsAPIs.createNewSubUser({
        userId: userId,
        subUserDetails: subUserDetails,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["subUsers"],
      });
      toast.success("Sub User Created Successfully!", {
        duration: 3000,
        richColors: true,
      });
      navigate(`/user-details/${userId}/sub-users`);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't Create Sub User!",
        duration: 3000,
        richColors: true,
      });
    },
  });

  if (createSubUser.isPending) {
    return <SubUserDetailsSkeleton />;
  }

  return (
    <DetailPagesRoot>
      <SubUserFormGrid
        onSubmit={subUserDetailsForm.onSubmit(createSubUser.mutate)}
      >
        <TextInput
          label="Name"
          placeholder="Fullname"
          {...subUserDetailsForm.getInputProps("userName")}
          className="w-full font-medium"
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...subUserDetailsForm.getInputProps("userEmail")}
          className="w-full font-medium"
        />
        <TextInput
          label="Address"
          placeholder="Address"
          {...subUserDetailsForm.getInputProps("userAddress")}
          className="w-full font-medium"
        />
        <SubUserPhoneNumber
          label="Phone Number"
          placeholder="Phone Number"
          props={subUserDetailsForm.getInputProps("userPhoneNumber")}
          error={subUserDetailsForm.errors.userPhoneNumber}
          className="w-full font-medium"
        />
        <MultiSelect
          id="assignedCategoriesToSubUser"
          label="Assigned Categories"
          placeholder="Select a Category"
          data={USER_ADDED_PROPERTY_CATEGORIES}
          {...subUserDetailsForm.getInputProps("assignedCategories")}
          className="col-span-2"
          clearable
          searchable
          hidePickedOptions
          maxDropdownHeight={200}
          withCheckIcon={false}
          nothingFoundMessage="Nothing found..."
          classNames={{
            input:
              "!border-[#cce2ff] !text-[#000929] !rounded-[8px] !py-[12px]",
            dropdown: "!rounded-[8px] !border-[#cce2ff]",
          }}
        />

        <SwitchItem
          label="Allow user to start inspection from scratch"
          checked={subUserDetailsForm.values.allowStartFromScratch}
          onChange={() => {
            subUserDetailsForm.setFieldValue(
              "allowStartFromScratch",
              !subUserDetailsForm.values.allowStartFromScratch
            );
          }}
        />
        <SwitchItem
          label="Allow user to create question for inspection"
          checked={subUserDetailsForm.values.allowCreateNewQuestions}
          onChange={() => {
            subUserDetailsForm.setFieldValue(
              "allowCreateNewQuestions",
              !subUserDetailsForm.values.allowCreateNewQuestions
            );
          }}
        />
        <SubUserActions>
          <Button
            id="updateSubUserDetails"
            label="Save"
            className={`sm:w-[208px] w-full font-bold text-[16px]`}
            type="submit"
            buttonType="contained"
          />
          <Button
            id="cancelUpdatingSubUserDetails"
            label="Cancel"
            className="!text-[#FF613E] hover:!text-white hover:!bg-[#FF613E] sm:w-[208px] w-full"
            type="button"
            buttonType="outlined"
            borderColor="#FF613E"
            onClick={() => navigate(-1)}
          />
        </SubUserActions>
      </SubUserFormGrid>
    </DetailPagesRoot>
  );
};

export default AddNewSubUser;
