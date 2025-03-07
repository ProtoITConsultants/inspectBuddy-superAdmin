import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import useUserAddedPropertyCategories from "../../../../hooks/useUserAddedPropertyCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import EditPropertyForm from "../../../../features/user-details/components/properties/details/EditPropertyDetails";
import { TextInput } from "@mantine/core";
import CountryInput from "../../../../features/user-details/components/properties/details/CountryInput";
import PropertyCategorySelect from "../../../../features/user-details/components/properties/PropertyCategorySelect";
import Button from "../../../../components/ui/Button";

const PROPERTY_CATEGORIES = [
  { _id: 1, value: "Residential", iconId: "2" },
  { _id: 2, value: "Commercial", iconId: "5" },
];

const EditUserProperty = () => {
  // Hooks
  const { userId, propertyId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // Local States
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);

  //Local Variable to Store original Reference ID
  const originalReferenceId = useRef("");

  // Query to fetch the Propoerty Details
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["propertyDetailsQuery", userId],
    queryFn: () =>
      userDetailsAPIs.fetchPropertyDetails({ propertyId: propertyId }),
  });

  // Form Initialization
  const form = useForm({
    initialValues: {
      propertyName: "",
      propertyImage: "",
      propertyStreetAddress: "",
      propertyUnitNumber: "",
      propertyCountry: "",
      propertyCity: "",
      propertyState: "",
      propertyZipCode: "",
      propertyCategory: "",
      referenceId: "",
    },

    validate: {
      propertyImage: (value) => (!value ? "Image is required" : null),

      propertyName: (value) =>
        !value || value.length < 10
          ? "Name should be at least 10 characters long"
          : null,

      propertyStreetAddress: (value) =>
        !value || value.length < 5
          ? "Street Address should be at least 5 characters long"
          : null,

      propertyCountry: (value) => (!value ? "Country is required" : null),

      propertyUnitNumber: (value) =>
        !value ? "Unit number is required" : null,

      // propertyCountry: (value) => (!value ? "Country is required" : null),

      propertyCity: (value) =>
        !value || value.length < 2
          ? "City should be at least 2 characters long"
          : null,

      propertyState: (value) => (!value ? "State is required" : null),

      propertyZipCode: (value) =>
        !value || value.length < 5
          ? "Zip code should be at least 5 characters long"
          : null,

      // propertyCategory: (value) => (!value ? "Category is required" : null),
      propertyCategory: (value) =>
        !value?.value ? "Category is required" : null,
    },
  });

  // Use Effect to find the current property details
  const formRef = useRef(form);
  useEffect(() => {
    if (data) {
      originalReferenceId.current = data.property?.referenceId;

      formRef.current.setValues({
        propertyName: data.property?.name,
        propertyImage: data.property?.image?.url,
        propertyStreetAddress: data.property?.address?.street,
        propertyUnitNumber: data.property?.address?.unit,
        propertyCountry: data.property?.address?.country,
        propertyCity: data.property?.address?.city,
        propertyState: data.property?.address?.state,
        propertyZipCode: data.property?.address?.zip,
        propertyCategory: data.property?.category,
        referenceId: data.property.isIDGenerated
          ? ""
          : data.property?.referenceId,
      }); // Set the form values
    }
  }, [data]);

  const handleUpdatePropertyDetails = async (propertyData) => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("id", propertyId);
    formData.append("name", propertyData.propertyName);
    formData.append(
      "address",
      JSON.stringify({
        unit: propertyData.propertyUnitNumber,
        street: propertyData.propertyStreetAddress,
        country: propertyData.propertyCountry,
        city: propertyData.propertyCity,
        state: propertyData.propertyState,
        zip: propertyData.propertyZipCode,
      })
    );
    formData.append("category", JSON.stringify(propertyData.propertyCategory));
    // Check if the reference ID is changed
    if (originalReferenceId.current !== propertyData.referenceId) {
      formData.append("referenceId", propertyData.referenceId);
    } else {
      formData.append("referenceId", "");
    }

    // Check if the image is changed
    if (propertyData.propertyImage instanceof File) {
      formData.append("image", propertyData.propertyImage);
    }

    return userDetailsAPIs.updatePropertyDetails(formData);
  };

  // Use Tanstack's react-query to add a new property
  const mutationUpdatePropertyDetails = useMutation({
    mutationFn: handleUpdatePropertyDetails,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["propertyDetailsQuery"],
      });
      navigate(`/user-details/${userId}/properties/details/${propertyId}`);
      toast.success("Success!", {
        description: "Property updated successfully!",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't Update Property Details!",
        duration: 3000,
      });
    },
  });

  // Return Function if Loading
  if (isPending || mutationUpdatePropertyDetails.isPending) {
    return <div>Loading...</div>;
  }

  // Return Function if Error Occured in Fetching
  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Property Details.`,
      duration: 3000,
    });
  }
  return (
    <DetailPagesRoot>
      <EditPropertyForm.Root heading="Property Details">
        <EditPropertyForm.ImageInput
          imageURL={form.values.propertyImage}
          inputLabel="Property Image"
          onImageUpload={(imageFile) =>
            form.setFieldValue("propertyImage", imageFile)
          }
          onImageRemove={() => form.setFieldValue("propertyImage", "")}
          error={form.errors.propertyImage}
        />
        <EditPropertyForm.Form
          onSubmit={form.onSubmit((values) =>
            mutationUpdatePropertyDetails.mutate(values)
          )}
        >
          <EditPropertyForm.DoubleColumnGrid>
            <TextInput
              label="Name"
              placeholder="Enter property name"
              {...form.getInputProps("propertyName")}
              className="w-full font-medium"
            />

            <TextInput
              label="House/Unit Number"
              placeholder="Unit number"
              {...form.getInputProps("propertyUnitNumber")}
              className="w-full font-medium"
            />

            <TextInput
              label="Street Address"
              placeholder="Enter Street Address"
              {...form.getInputProps("propertyStreetAddress")}
              className="w-full font-medium"
            />
            <CountryInput
              selectedCountry={form.values.propertyCountry}
              onCountrySelect={(value) =>
                form.setFieldValue("propertyCountry", value)
              }
              error={form.errors.propertyCountry}
            />
          </EditPropertyForm.DoubleColumnGrid>
          <EditPropertyForm.TripleColumnGrid>
            <TextInput
              label="City"
              placeholder="Enter City"
              {...form.getInputProps("propertyCity")}
              className="w-full font-medium"
            />

            <TextInput
              label="State/Province"
              placeholder="State/Province"
              {...form.getInputProps("propertyState")}
              className="w-full font-medium"
            />

            <TextInput
              label="Zip/Postal Code"
              placeholder="Zip/Postal Code"
              {...form.getInputProps("propertyZipCode")}
              className="w-full font-medium md:col-span-1 col-span-2"
            />
          </EditPropertyForm.TripleColumnGrid>
          <EditPropertyForm.DoubleColumnGrid>
            <PropertyCategorySelect
              options={USER_ADDED_PROPERTY_CATEGORIES}
              value={form.values.propertyCategory}
              error={form.errors.propertyCategory}
              onChange={(value) => {
                if (value === "add-category") {
                  // Handle the custom action when "Add a Category" is selected
                  setShowCustomCategoryInput(true); // For example, showing a custom input for adding a new category
                  form.setFieldValue("propertyCategory", {
                    value: "",
                    iconId: "",
                  });
                } else {
                  setShowCustomCategoryInput(false);
                  form.setFieldValue("propertyCategory", {
                    value: value,
                    iconId: PROPERTY_CATEGORIES.find(
                      (cat) => cat.value === value
                    )?.iconId,
                  });
                }
              }}
            />
            <TextInput
              label="Reference ID"
              placeholder="Enter Reference ID"
              {...form.getInputProps("referenceId")}
              className="w-full font-medium"
            />

            {showCustomCategoryInput && (
              <TextInput
                placeholder="Please Enter Category Here"
                value={form.values.propertyCategory.value}
                onChange={(e) => {
                  form.setFieldValue("propertyCategory", {
                    value: e.target.value,
                    iconId: "",
                  });
                }}
                className="w-full font-medium"
              />
            )}
          </EditPropertyForm.DoubleColumnGrid>
          <EditPropertyForm.ActionButtons>
            <Button
              id="update-property"
              label="Update Property"
              type="submit"
              className="sm:!w-[216px] w-full font-bold !py-[12px]"
              buttonType="contained"
            />
            <Button
              id="cancel-property-update"
              label="Cancel"
              type="button"
              className="sm:!w-[216px] w-full font-bold !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E] !py-[12px]"
              buttonType="outlined"
              onClick={() => navigate(1)}
              borderColor="#FF613E"
            />
          </EditPropertyForm.ActionButtons>
        </EditPropertyForm.Form>
      </EditPropertyForm.Root>
    </DetailPagesRoot>
  );
};

export default EditUserProperty;
