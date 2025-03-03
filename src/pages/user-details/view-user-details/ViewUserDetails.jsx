import { useParams } from "react-router";
import { useUserDetailsStore } from "../../../store/userDetailsStore";
import { userDetailsAPIs } from "./../../../features/user-details/api/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useForm } from "@mantine/form";
import EditUserProfileSkeleton from "../../../features/user-details/components/EditUserProfileSkeleton";
import EditUserDetailsForm from "../../../features/user-details/components/FormComponents";
import PictureInput from "../../../components/PictureInput/PictureInput";
import { Select, Textarea, TextInput } from "@mantine/core";
import BusinessLogoInput from "../../../components/BusinessLogoInput/BusinessLogoInput";
import PhoneInput from "../../../components/PhoneInput/PhoneInput";
import Button from "./../../../components/ui/Button";

const ViewUserDetails = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Hooks
  const { userId } = useParams();

  // Global States
  const editingUserDetails = useUserDetailsStore(
    (state) => state.editingUserDetails
  );
  const setEditingUserDetails = useUserDetailsStore(
    (state) => state.setEditingUserDetails
  );
  const setShowSubUserOption = useUserDetailsStore(
    (state) => state.setShowSubUserOption
  );

  // Mantine Form
  const form = useForm({
    initialValues: {
      personalImage: "",
      fullname: "",
      email: "",
      currentPlan: "",
      phoneCountryCode: "",
      phoneNumber: "",
      businessLogoImage: "",
      businessName: "",
      businessAddress: "",
      businessCountryCode: "",
      businessPhoneNumber: "",
      businessWebsite: "",
      headerParagraph: "",
      footerParagraph: "",
    },

    validate: (values) => ({
      fullname:
        values.fullname.length > 0 && values.fullname.length < 4
          ? "Fullname should be atleast 4 characters"
          : null,
      // current plan should have a value
      currentPlan: !values.currentPlan ? "Please select a plan" : null,

      phoneCountryCode: !values.phoneCountryCode
        .replace(/^\+/, "")
        .split(" ")[0]
        ? "Please select a country code"
        : null,

      phoneNumber:
        values.phoneNumber.replace(/[\s()-]/g, "").length < 10
          ? "Please enter a valid phone number"
          : null,

      businessName:
        values.businessName.length > 0 && values.businessName.length < 4
          ? "Business Name should be atleast 4 characters"
          : null,

      businessCountryCode: !values.businessCountryCode
        .replace(/^\+/, "")
        .split(" ")[0]
        ? "Please select a country code"
        : null,

      businessPhoneNumber:
        values.businessPhoneNumber.replace(/[\s()-]/g, "").length < 10
          ? "Please enter a valid phone number"
          : null,

      businessAddress:
        values.businessAddress.length > 0 && values.businessAddress.length < 10
          ? "Business Address should be atleast 10 characters"
          : null,

      businessWebsite:
        values.businessWebsite.length > 0 &&
        !values.businessWebsite.match(
          /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\/?$/
        )
          ? "Business Website is not Valid!"
          : null,
    }),
  });

  // Ref Values
  const formRef = useRef(form);
  const imagesInitialValueRef = useRef();

  // Query To Fetch User Details
  const fetchUserDetails = useCallback(
    () => userDetailsAPIs.fetchUserProfileDetails({ userId }),
    [userId]
  );

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["userProfileDetails", userId],
    queryFn: fetchUserDetails,
    enabled: !!userId, // Ensures query only runs when userId exists
  });

  // Update User Details Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (API_DATA) =>
      userDetailsAPIs.updateUserProfileDetails(API_DATA),
    onSuccess: () => {
      toast.success("Success!", {
        description: "User's Profile updated Successfully!",
        duration: 3000,
      });

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userProfileDetails"] });

      // Reset the Editing State
      setEditingUserDetails(false);
    },
  });

  // Use Effect to set the State
  useEffect(() => {
    if (!data) return;

    const newValues = {
      personalImage: data?.profilePicture?.url,
      fullname: data?.fullname,
      email: data?.email,
      currentPlan:
        data?.role === "FREETIER"
          ? "Free Tier"
          : data?.role === "STANDARDTIER"
          ? "Standard Tier"
          : data?.role === "TOPTIER"
          ? "Top Tier"
          : "",
      phoneCountryCode: data?.personalPhoneNumber?.slice(0, -10) || "",
      phoneNumber: data?.personalPhoneNumber?.slice(-10) || "",
      businessLogoImage: data?.businessLogo?.url,
      businessName: data?.businessName,
      businessAddress: data?.businessAddress,
      businessCountryCode: data?.businessPhoneNumber?.slice(0, -10) || "",
      businessPhoneNumber: data?.businessPhoneNumber?.slice(-10) || "",
      businessWebsite: data?.businessWebsite,
      headerParagraph: data?.pdfIntro,
      footerParagraph: data?.pdfOutro,
    };

    // Update form values only if they have changed
    if (JSON.stringify(formRef.current.values) !== JSON.stringify(newValues)) {
      formRef.current.setValues(newValues);
    }

    imagesInitialValueRef.current = {
      personalImage: data?.profilePicture?.url,
      businessLogoImage: data?.businessLogo?.url,
    };

    setShowSubUserOption(data?.role === "TOPTIER");
  }, [data, setShowSubUserOption]);

  // Error Toast
  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch User Details.`,
      duration: 3000,
    });
  }

  if (isPending || updateProfileMutation.isPending) {
    return <EditUserProfileSkeleton />;
  }

  const handleUpdateUserInfo = () => {
    const formData = form.getValues();

    const correctPhoneNumber = formData.phoneNumber.replace(/[\s()-]/g, "");

    const correctBusinessPhoneNumber = formData.businessPhoneNumber.replace(
      /[\s()-]/g,
      ""
    );

    const API_DATA = new FormData();
    API_DATA.append("userId", userId);
    API_DATA.append("fullname", formData.fullname);
    if (correctPhoneNumber !== "") {
      const completePhoneNumber =
        formData.phoneCountryCode + correctPhoneNumber;
      API_DATA.append("personalPhoneNumber", completePhoneNumber);
    } else {
      API_DATA.append("personalPhoneNumber", "");
    }

    if (
      formData.personalImage !== imagesInitialValueRef.current.personalImage
    ) {
      API_DATA.append("profilePicture", formData.personalImage);
    }
    API_DATA.append(
      "currentPlan",
      formData.currentPlan === "Free Tier"
        ? "FREETIER"
        : formData.currentPlan === "Standard Tier"
        ? "STANDARDTIER"
        : formData.currentPlan === "Top Tier"
        ? "TOPTIER"
        : ""
    );
    API_DATA.append("businessName", formData.businessName);
    API_DATA.append("businessAddress", formData.businessAddress);

    if (correctBusinessPhoneNumber !== "") {
      const completePhoneNumber =
        formData.businessCountryCode + correctBusinessPhoneNumber;
      API_DATA.append("businessPhoneNumber", completePhoneNumber);
    } else {
      API_DATA.append("businessPhoneNumber", "");
    }

    API_DATA.append("businessWebsite", formData.businessWebsite);

    // Check if the user has uploaded a new image
    if (
      formData.businessLogoImage !==
      imagesInitialValueRef.current.businessLogoImage
    ) {
      API_DATA.append("businessLogo", formData.businessLogoImage);
    }

    API_DATA.append("pdfIntro", formData.headerParagraph);
    API_DATA.append("pdfOutro", formData.footerParagraph);

    updateProfileMutation.mutate(API_DATA);
  };

  return (
    <EditUserDetailsForm.UserDetailsFormRoot
      onFormSubmit={form.onSubmit(handleUpdateUserInfo)}
    >
      <EditUserDetailsForm.UserDetailFormSection heading="User Details">
        <PictureInput
          section="personalInfo"
          title="Avatar"
          pictureURL={form.values.personalImage}
          showUploadBtn={editingUserDetails}
          onUploadPersonalAvatar={(picture) =>
            form.setValues((currentValues) => ({
              ...currentValues,
              personalImage: picture,
            }))
          }
        />
        <EditUserDetailsForm.UserDetailsFormRow>
          <TextInput
            label="Name"
            placeholder="Enter Fullname"
            {...form.getInputProps("fullname")}
            className="w-full font-medium"
            value={form.values.fullname}
            disabled={!editingUserDetails}
          />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            {...form.getInputProps("email")}
            className="w-full font-medium"
            value={form.values.email}
            disabled={true}
          />

          <PhoneInput
            id="personalNumber-input"
            label="Phone Number"
            formValueRef={form.getInputProps("phoneNumber")}
            value={form.values.phoneNumber}
            disabled={!editingUserDetails}
            errorText={form.errors.phoneNumber || form.errors.phoneCountryCode}
            countryCode={form.values.phoneCountryCode}
            setCountryCode={(value) =>
              form.setFieldValue("phoneCountryCode", value)
            }
          />
          <Select
            id="editUserPlanDetails"
            label="Current Plan"
            placeholder="Select User's Plan"
            data={["Free Tier", "Standard Tier", "Top Tier"]}
            {...form.getInputProps("currentPlan")}
            disabled={!editingUserDetails}
            allowDeselect={false}
          />
        </EditUserDetailsForm.UserDetailsFormRow>
      </EditUserDetailsForm.UserDetailFormSection>
      <EditUserDetailsForm.UserDetailFormSection heading="Business Info">
        <BusinessLogoInput
          title="Logo"
          pictureURL={form.values.businessLogoImage}
          showUploadBtn={editingUserDetails}
          onUploadBusinessLogo={(picture) =>
            form.setValues((currentValues) => ({
              ...currentValues,
              businessLogoImage: picture,
            }))
          }
        />
        <EditUserDetailsForm.UserDetailsFormRow>
          <TextInput
            label="Company Name"
            placeholder="Enter Business Name"
            {...form.getInputProps("businessName")}
            className="w-full font-medium"
            value={form.values.businessName}
            disabled={!editingUserDetails}
          />
          <TextInput
            label="Adress"
            placeholder="Enter Business Address"
            {...form.getInputProps("businessAddress")}
            value={form.values.businessAddress}
            className="w-full font-medium"
            disabled={!editingUserDetails}
          />

          <PhoneInput
            id="businessNumber-input"
            label="Phone Number"
            formValueRef={form.getInputProps("businessPhoneNumber")}
            value={form.values.businessPhoneNumber}
            disabled={!editingUserDetails}
            errorText={
              form.errors.businessPhoneNumber || form.errors.businessCountryCode
            }
            countryCode={form.values.businessCountryCode}
            setCountryCode={(value) =>
              form.setFieldValue("businessCountryCode", value)
            }
          />
          <TextInput
            label="Website"
            placeholder="Enter Website Link"
            {...form.getInputProps("businessWebsite")}
            className="w-full font-medium"
            value={form.values.businessWebsite}
            disabled={!editingUserDetails}
          />
        </EditUserDetailsForm.UserDetailsFormRow>
      </EditUserDetailsForm.UserDetailFormSection>
      <EditUserDetailsForm.UserDetailFormSection heading="Brand Settings">
        <Textarea
          label="Top Report Paragraph"
          placeholder="Details..."
          {...form.getInputProps("headerParagraph")}
          disabled={!editingUserDetails}
          autosize
          minRows={8}
        />
        <Textarea
          label="Footer Report Paragraph"
          placeholder="Details..."
          {...form.getInputProps("footerParagraph")}
          disabled={!editingUserDetails}
          autosize
          minRows={8}
        />
      </EditUserDetailsForm.UserDetailFormSection>
      <EditUserDetailsForm.UserDetailsFormAction
        showButtons={editingUserDetails}
      >
        <Button
          id="save-user-info"
          label="Save Changes"
          type="submit"
          buttonType="contained"
        />

        <Button
          id="cancel-brand-settings"
          label="Cancel"
          className="!text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
          type="button"
          onClick={() => {
            setEditingUserDetails(false);
          }}
          buttonType="outlined"
          borderColor="#FF613E"
        />
      </EditUserDetailsForm.UserDetailsFormAction>
    </EditUserDetailsForm.UserDetailsFormRoot>
  );
};

export default ViewUserDetails;
