import { useParams } from "react-router";
import { useUserDetailsStore } from "../../../store/userDetailsStore";
import { userDetailsAPIs } from "./../../../features/user-details/api/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "@mantine/form";
import EditUserProfileSkeleton from "../../../features/user-details/components/EditUserProfileSkeleton";

const ViewUserDetails = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Hooks
  const { userId } = useParams();

  // Global States
  // const editingUserDetails = useUserDetailsStore(
  //   (state) => state.editingUserDetails
  // );
  // const setEditingUserDetails = useUserDetailsStore(
  //   (state) => state.setEditingUserDetails
  // );
  const setShowSubUserOption = useUserDetailsStore(
    (state) => state.setShowSubUserOption
  );

  // Local States
  const [personalPhoneCountryCode, setPersonalPhoneCountryCode] = useState("");
  const [businessPhoneCountryCode, setBusinessPhoneCountryCode] = useState("");
  // const [personalNumberValid, setPersonalNumberValid] = useState(true);
  // const [businessNumberValid, setBusinessNumberValid] = useState(true);

  // Mantine Form
  const form = useForm({
    initialValues: {
      personalImage: "",
      fullname: "",
      email: "",
      currentPlan: "",
      phoneNumber: "",
      businessLogoImage: "",
      businessName: "",
      businessAddress: "",
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

      businessName:
        values.businessName.length > 0 && values.businessName.length < 4
          ? "Business Name should be atleast 4 characters"
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

  const { data, error, isError, isPending, isFetching } = useQuery({
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
      phoneNumber: data?.personalPhoneNumber?.slice(-10) || "",
      businessLogoImage: data?.businessLogo?.url,
      businessName: data?.businessName,
      businessAddress: data?.businessAddress,
      businessPhoneNumber: data?.businessPhoneNumber?.slice(-10) || "",
      businessWebsite: data?.businessWebsite,
      headerParagraph: data?.pdfIntro,
      footerParagraph: data?.pdfOutro,
    };

    // Update form values only if they have changed
    if (JSON.stringify(formRef.current.values) !== JSON.stringify(newValues)) {
      formRef.current.setValues(newValues);
      setPersonalPhoneCountryCode(
        data?.personalPhoneNumber?.slice(0, -10) || ""
      );
      setBusinessPhoneCountryCode(
        data?.businessPhoneNumber?.slice(0, -10) || ""
      );
    }

    // formRef.current.setValues({
    //   personalImage: data?.profilePicture?.url,
    //   fullname: data?.fullname,
    //   email: data?.email,
    //   currentPlan:
    //     data?.role === "FREETIER"
    //       ? "Free Tier"
    //       : data?.role === "STANDARDTIER"
    //       ? "Standard Tier"
    //       : data?.role === "TOPTIER"
    //       ? "Top Tier"
    //       : "",
    //   phoneNumber: data?.personalPhoneNumber?.slice(-10) || "",
    //   businessLogoImage: data?.businessLogo?.url,
    //   businessName: data?.businessName,
    //   businessAddress: data?.businessAddress,
    //   businessPhoneNumber: data?.businessPhoneNumber?.slice(-10) || "",
    //   businessWebsite: data?.businessWebsite,
    //   headerParagraph: data?.pdfIntro,
    //   footerParagraph: data?.pdfOutro,
    // });
    // setPersonalPhoneCountryCode(data?.personalPhoneNumber?.slice(0, -10) || "");
    // setBusinessPhoneCountryCode(data?.businessPhoneNumber?.slice(0, -10) || "");

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

  if (isPending) {
    return <EditUserProfileSkeleton />;
  }

  if (isFetching) {
    return <EditUserProfileSkeleton />;
  }

  return <div>viewUserDetails</div>;
};

export default ViewUserDetails;
