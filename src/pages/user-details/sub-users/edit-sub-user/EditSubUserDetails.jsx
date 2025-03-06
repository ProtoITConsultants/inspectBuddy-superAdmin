import { useNavigate, useParams } from "react-router";
import useUserAddedPropertyCategories from "../../../../hooks/useUserAddedPropertyCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import SubUserDetailsSkeleton from "../../../../features/user-details/components/sub-users/details/subUserDetailsSkeleton";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import {
  SubUserActions,
  SubUserFormGrid,
  SubUserPhoneNumber,
} from "../../../../features/user-details/components/sub-users/details/EditDetailsForm";
import { MultiSelect, TextInput } from "@mantine/core";
import { SwitchItem } from "../../../../features/user-details/components/sub-users/details/ViewDetailsForm";
import Button from "../../../../components/ui/Button";

const EditSubUserDetails = () => {
  // Hooks
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId, subUserId } = useParams();
  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // Query to fetch user Details
  const { data, isError, error, isPending, isSuccess } = useQuery({
    queryKey: ["subUserDetailsQuery", subUserId],
    queryFn: () =>
      userDetailsAPIs.fetchSubUserDetails({ subUserId: subUserId }),
  });

  //  Update Sub User
  const handleUpdateSubUser = async () => {
    const updatedAssignedCategories = USER_ADDED_PROPERTY_CATEGORIES.filter(
      (category) => {
        return form.values.assignedCategories.includes(category.value);
      }
    );

    // API Params
    const API_PARMS = {
      subUserId: subUserId,
      userName: form.values.userName,
      userEmail: form.values.userEmail,
      userAddress: form.values.userAddress,
      userPhoneNumber: form.values.userPhoneNumber,
      allowCreateNewQuestions: form.values.allowCreateNewQuestions,
      allowStartFromScratch: form.values.allowStartFromScratch,
      assignedCategories: updatedAssignedCategories,
      userId: userId,
    };

    return userDetailsAPIs.updateSubUserDetails(API_PARMS);
  };

  //Mutation
  const updateSubUserMutation = useMutation({
    mutationFn: handleUpdateSubUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["updateSubUserMutation"] });

      navigate(`/user-details/${userId}/sub-users/details/${subUserId}`);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't Update User Details!",
        duration: 3000,
      });
    },
  });

  const form = useForm({
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
        assignedCategories:
          values.assignedCategories.length === 0
            ? "Please select atleast one category"
            : null,
      };
    },
  });

  const formRef = useRef(form);

  // Use useEffect to set form values when data is successfully fetched
  useEffect(() => {
    if (isSuccess) {
      formRef.current.setValues({
        userName: data.subUser.fullname,
        userEmail: data.subUser.email,
        userAddress: data.subUser.address,
        userPhoneNumber: data.subUser.phoneNumber,
        assignedCategories: data.subUser.assignedCategories.map(
          (category) => category.value
        ),
        allowStartFromScratch: data.subUser.canInspectFromScratch,
        allowCreateNewQuestions: data.subUser.canCreateInspectionQuestions,
      });
    }
  }, [isSuccess, data]);

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Sub User's Details.`,
      duration: 3000,
    });
  }

  if (isPending || updateSubUserMutation.isPending) {
    return <SubUserDetailsSkeleton />;
  }

  return (
    <DetailPagesRoot>
      <SubUserFormGrid onSubmit={form.onSubmit(updateSubUserMutation.mutate)}>
        <TextInput
          label="Name"
          placeholder="Fullname"
          {...form.getInputProps("userName")}
          className="w-full font-medium"
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("userEmail")}
          className="w-full font-medium"
        />
        <TextInput
          label="Address"
          placeholder="Address"
          {...form.getInputProps("userAddress")}
          className="w-full font-medium"
        />
        <SubUserPhoneNumber
          label="Phone Number"
          placeholder="Phone Number"
          props={form.getInputProps("userPhoneNumber")}
          error={form.errors.userPhoneNumber}
          className="w-full font-medium"
        />
        <MultiSelect
          id="assignedCategoriesToSubUser"
          label="Assigned Categories"
          placeholder="Select a Category"
          data={USER_ADDED_PROPERTY_CATEGORIES}
          {...form.getInputProps("assignedCategories")}
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
          checked={form.values.allowStartFromScratch}
          onChange={() => {
            form.setFieldValue(
              "allowStartFromScratch",
              !form.values.allowStartFromScratch
            );
          }}
        />
        <SwitchItem
          label="Allow user to create question for inspection"
          checked={form.values.allowCreateNewQuestions}
          onChange={() => {
            form.setFieldValue(
              "allowCreateNewQuestions",
              !form.values.allowCreateNewQuestions
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

export default EditSubUserDetails;
