import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersListAPIs } from "../../../features/users/api";
import DetailPagesRoot from "../../../features/user-details/components/DetailPagesRoot";
import UserDetailsForm from "../../../features/user-details/components/FormComponents";
import { Select, TextInput } from "@mantine/core";
import Button from "../../../components/ui/Button";
import { Link, useNavigate } from "react-router";
import PictureInput from "../../../components/PictureInput/PictureInput";

const AddNewUser = () => {
  // Access the client
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mantine Form
  const newUserForm = useForm({
    initialValues: {
      personalImage: "",
      fullname: "",
      email: "",
      userSubscriptionPlan: "",
    },

    validate: (values) => ({
      fullname:
        values.fullname.length < 3
          ? "Name should be atleast 3 characters"
          : null,

      email: !values.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ? "User Email is not Valid!"
        : null,
      // current plan should have a value
      userSubscriptionPlan: values.userSubscriptionPlan
        ? null
        : "Subscription Plan is required!",
    }),
  });

  // Create New User - Mutation
  const createNewUser = useMutation({
    mutationFn: () => usersListAPIs.createNewUser(newUserForm.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsersQuery"] });
      toast.success("Success!", {
        description: "User added successfully.",
        duration: 3000,
        richColors: true,
      });
      navigate("/all-users");
    },

    onError: (error) => {
      console.error(error);
      toast.error("Error!", {
        description: error?.message || "Couldn't add new User.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
      <form
        onSubmit={newUserForm.onSubmit(createNewUser.mutate)}
        className="flex flex-col gap-[32px]"
      >
        <UserDetailsForm.UserDetailFormSection
          heading="User Details"
          className="!px-0"
        >
          <PictureInput
            section="personalInfo"
            title="Avatar"
            pictureURL={newUserForm.values.personalImage}
            showUploadBtn={true}
            onUploadPersonalAvatar={(picture) =>
              newUserForm.setValues((currentValues) => ({
                ...currentValues,
                personalImage: picture,
              }))
            }
          />
          <UserDetailsForm.UserDetailsFormRow>
            <TextInput
              label="Name"
              placeholder="Enter Fullname"
              {...newUserForm.getInputProps("fullname")}
              className="w-full font-medium"
            />
            <TextInput
              label="Email"
              placeholder="Enter Email"
              {...newUserForm.getInputProps("email")}
              className="w-full font-medium"
            />

            <Select
              id="editUserPlanDetails"
              label="User Role"
              placeholder="Select User's Role"
              data={["Free Tier", "Standard Tier", "Top Tier"]}
              {...newUserForm.getInputProps("userSubscriptionPlan")}
              allowDeselect={false}
              error={newUserForm.errors.userSubscriptionPlan}
            />
          </UserDetailsForm.UserDetailsFormRow>
        </UserDetailsForm.UserDetailFormSection>
        <UserDetailsForm.UserDetailsFormAction showButtons={true}>
          <Button
            id="create-new-user"
            label="Save Changes"
            type="submit"
            buttonType="contained"
            className="sm:min-w-[150px] sm:w-fit w-full"
          />

          <Link
            to="/all-users"
            label="Cancel"
            className="text-[#FF613E] border-2 border-[#FF613E] hover:text-white hover:bg-[#FF613E] px-6 py-3 h-12 rounded-lg flex items-center justify-center hover:cursor-pointer sm:w-[150px] w-full"
          >
            Cancel
          </Link>
        </UserDetailsForm.UserDetailsFormAction>
      </form>
    </DetailPagesRoot>
  );
};

export default AddNewUser;
