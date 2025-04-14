import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userPropertiesAPIs } from "../../../../features/user-details/api/user-properties";
import { Link, useNavigate, useParams } from "react-router";
import Button from "../../../../components/ui/Button";
import EditPropertyForm from "../../../../features/user-details/components/properties/details/EditPropertyDetails";
import { TextInput } from "@mantine/core";
import PropertyCategorySelect from "../../../../features/user-details/components/properties/PropertyCategorySelect";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import CountryInput from "../../../../features/user-details/components/properties/details/CountryInput";
import useUserAddedPropertyCategories from "../../../../hooks/useUserAddedPropertyCategories";
import { useState } from "react";
import AddPropertyCategoryModal from "../../../../features/user-details/components/properties/AddPropertyCategoryModal";

const AddUserProperty = () => {
  // Hooks
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // Local States
  const [showAddPropertyCategoryModal, setShowAddPropertyCategoryModal] =
    useState(false);

  // Form Initialization
  const propertyForm = useForm({
    initialValues: {
      propertyName: "",
      propertyImage: "",
      propertyStreetAddress: "",
      propertyUnitNumber: "",
      propertyCountry: "",
      propertyCity: "",
      propertyState: "",
      propertyZipCode: "",
      propertyCategory: {},
      referenceId: "",
    },

    validate: {
      //   propertyImage: (value) => (!value ? "Image is required" : null),
      propertyName: (value) => (!value ? "Property name is required" : null),

      propertyStreetAddress: (value) =>
        !value ? "Street address is required" : null,

      propertyCountry: (value) => (!value ? "Country is required" : null),

      propertyUnitNumber: (value) =>
        !value ? "Unit number is required" : null,

      // propertyCountry: (value) => (!value ? "Country is required" : null),

      propertyCity: (value) => (!value ? "City is required" : null),

      propertyState: (value) => (!value ? "State is required" : null),

      propertyZipCode: (value) => (!value ? "Zip code is required" : null),

      // propertyCategory: (value) => (!value ? "Category is required" : null),
      //   propertyCategory: (value) =>
      //     !value?.value ? "Category is required" : null,
    },
  });

  // Create Property - Mutation
  const createProperty = useMutation({
    mutationFn: (propertyData) => {
      // Create a FormData object
      const formData = new FormData();
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

      const selectedCategoryId = USER_ADDED_PROPERTY_CATEGORIES.find(
        (cat) => cat.value === propertyData.propertyCategory.value
      )?._id;

      formData.append("categoryId", selectedCategoryId || "");
      formData.append("referenceID", propertyData.referenceId);
      formData.append("image", propertyData.propertyImage);

      return userPropertiesAPIs.addNewProperty({
        formData,
        userId,
      });
    },

    onSuccess: () => {
      toast.success("Property Added Successfully", {
        duration: 3000,
        richColors: true,
      });
      propertyForm.reset();
      queryClient.invalidateQueries({
        queryKey: ["propertiesQuery"],
      });
      navigate(`/user-details/${userId}/properties`);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error?.message || "Couldn't add property!",
        duration: 3000,
        richColors: true,
      });
    },
  });

  return (
    <>
      <AddPropertyCategoryModal
        isModalOpen={showAddPropertyCategoryModal}
        onCloseModal={() => {
          setShowAddPropertyCategoryModal(false);
        }}
      />

      <DetailPagesRoot className="!overflow-hidden !h-full">
        <EditPropertyForm.Root heading="Property Details">
          <EditPropertyForm.ImageInput
            imageURL={propertyForm.values.propertyImage}
            inputLabel="Property Image"
            onImageUpload={(imageFile) =>
              propertyForm.setFieldValue("propertyImage", imageFile)
            }
            onImageRemove={() =>
              propertyForm.setFieldValue("propertyImage", "")
            }
            error={propertyForm.errors.propertyImage}
          />
          <EditPropertyForm.Form
            onSubmit={propertyForm.onSubmit((values) =>
              createProperty.mutate(values)
            )}
          >
            <EditPropertyForm.DoubleColumnGrid>
              <TextInput
                label="Name"
                placeholder="Enter property name"
                {...propertyForm.getInputProps("propertyName")}
                className="w-full font-medium"
              />

              <TextInput
                label="House/Unit Number"
                placeholder="Unit number"
                {...propertyForm.getInputProps("propertyUnitNumber")}
                className="w-full font-medium"
              />

              <TextInput
                label="Street Address"
                placeholder="Enter Street Address"
                {...propertyForm.getInputProps("propertyStreetAddress")}
                className="w-full font-medium"
              />
              <CountryInput
                selectedCountry={propertyForm.values.propertyCountry}
                onCountrySelect={(value) =>
                  propertyForm.setFieldValue("propertyCountry", value)
                }
                error={propertyForm.errors.propertyCountry}
              />
            </EditPropertyForm.DoubleColumnGrid>
            <EditPropertyForm.TripleColumnGrid>
              <TextInput
                label="City"
                placeholder="Enter City"
                {...propertyForm.getInputProps("propertyCity")}
                className="w-full font-medium"
              />

              <TextInput
                label="State/Province"
                placeholder="State/Province"
                {...propertyForm.getInputProps("propertyState")}
                className="w-full font-medium"
              />

              <TextInput
                label="Zip/Postal Code"
                placeholder="Zip/Postal Code"
                {...propertyForm.getInputProps("propertyZipCode")}
                className="w-full font-medium md:col-span-1 col-span-2"
              />
            </EditPropertyForm.TripleColumnGrid>
            <EditPropertyForm.DoubleColumnGrid>
              <PropertyCategorySelect
                options={USER_ADDED_PROPERTY_CATEGORIES}
                value={propertyForm.values.propertyCategory}
                error={propertyForm.errors.propertyCategory}
                onChange={(value) => {
                  if (value === "add-category") {
                    setShowAddPropertyCategoryModal(true);
                    propertyForm.setFieldValue("propertyCategory", {});
                  } else {
                    propertyForm.setFieldValue("propertyCategory", {
                      value: value,
                      iconId: USER_ADDED_PROPERTY_CATEGORIES.find(
                        (cat) => cat.value === value
                      )?.iconId,
                    });
                  }
                }}
              />
              <TextInput
                label="Reference ID"
                placeholder="Enter Reference ID"
                {...propertyForm.getInputProps("referenceId")}
                className="w-full font-medium"
              />
            </EditPropertyForm.DoubleColumnGrid>
            <EditPropertyForm.ActionButtons>
              <Button
                id="create-property"
                label="Create Property"
                type="submit"
                className="sm:!w-[216px] w-full font-bold !py-[12px]"
                buttonType="contained"
              />
              <Link
                to={-1}
                id="cancel-property-update"
                className="sm:w-[216px] w-full font-bold text-[#FF613E] hover:text-white hover:bg-[#FF613E] py-[12px] flex items-center justify-center border rounded-[8px]"
              >
                Cancel
              </Link>
            </EditPropertyForm.ActionButtons>
          </EditPropertyForm.Form>
        </EditPropertyForm.Root>
      </DetailPagesRoot>
    </>
  );
};

export default AddUserProperty;
