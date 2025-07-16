import { NumberInput, Textarea, TextInput } from "@mantine/core";
import EditAppInfoButton from "../../features/app-information/components/edit-app-info-button/EditAppInfoButton";
import { useForm } from "@mantine/form";
import { useEffect, useRef, useState } from "react";
import AddReleaseNotesButton from "../../features/app-information/components/AddReleaseNotesButton";
import ReleaseNotesInput from "../../features/app-information/components/ReleaseNotesInput";
import Button from "../../components/ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appInfoAPIs } from "../../features/app-information/api";
import { toast } from "sonner";
import EditAppInfoSkeleton from "../../features/app-information/components/EditAppInfoSkeleton";

const Heading = ({ title }) => {
  return (
    <h2 className="md:text-[20px] text-[16px] font-bold leading-normal">
      {title}
    </h2>
  );
};

const AppInformation = () => {
  // Query Client Hook
  const queryClient = useQueryClient();

  // Local States
  const [isEditing, setIsEditing] = useState(false);

  // useForm Hook from Mantine Dev
  const appInformationForm = useForm({
    initialValues: {
      appDetails: "",
      webVersion: "",
      androidVersion: "",
      iosVersion: "",
      latestReleaseNotes: [],
      email: "",
      website: "",
    },
    validate: (values) => ({
      appDetails: !values.appDetails ? "App details are required!" : null,
      webVersion: !values.webVersion ? "Web version is required!" : null,
      androidVersion: !values.androidVersion
        ? "Android version is required!"
        : null,
      iosVersion: !values.iosVersion ? "IOS version is required!" : null,
      email: !values.email
        ? "Email is required!"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)
        ? "Enter a valid email address!"
        : null,
      website: !values.website ? "Website is required!" : null,
      latestReleaseNotes:
        values.latestReleaseNotes.length === 0
          ? null
          : values.latestReleaseNotes.some((note) => !note)
          ? "Release notes are required!"
          : null,
    }),
  });

  // Get App Information - Query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["appInformation"],
    queryFn: () => appInfoAPIs.fetchAppInfo(),
  });

  // Update App Information - Mutation
  const updateAppInformation = useMutation({
    mutationFn: () =>
      appInfoAPIs.updateAppInfo({
        appDetails: appInformationForm.values.appDetails,
        webVersion: appInformationForm.values.webVersion,
        androidVersion: appInformationForm.values.androidVersion,
        iosVersion: appInformationForm.values.iosVersion,
        releaseNotes: appInformationForm.values.latestReleaseNotes,
        email: appInformationForm.values.email,
        website: appInformationForm.values.website,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appInformation"],
      });
      toast.success("Success!", {
        description: "App information updated successfully.",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error?.message || "Couldn't update app information.",
      });
    },
  });

  // Form Ref for setting intial Values
  const formRef = useRef(appInformationForm);
  useEffect(() => {
    if (data) {
      formRef.current.setValues({
        appDetails: data.appDetails,
        webVersion: data.appVersion.webVersion,
        androidVersion: data.appVersion.androidVersion,
        iosVersion: data.appVersion.iosVersion,
        latestReleaseNotes: data.releaseNotes,
        email: data.contact.email,
        website: data.contact.website,
      });
    }
  }, [data]);

  if (isError) {
    toast.error("Error!", {
      description: error?.message || "Couldn't fetch app information.",
    });
  }

  if (isPending || updateAppInformation.isPending) {
    return <EditAppInfoSkeleton />;
  }

  return (
    <section className="relative">
      {!isEditing && <EditAppInfoButton onClick={() => setIsEditing(true)} />}
      <form
        onSubmit={appInformationForm.onSubmit(updateAppInformation.mutate)}
        className="flex flex-col md:gap-8 gap-4 w-full max-w-[792px]"
      >
        {/* App Details */}
        <div className="flex flex-col gap-2">
          <Heading title="App Details" />
          <Textarea
            placeholder="Add app details here..."
            autosize
            minRows={6}
            maxRows={8}
            disabled={!isEditing}
            {...appInformationForm.getInputProps("appDetails")}
          />
        </div>

        {/* App Versions */}
        <div className="flex flex-col gap-2">
          <Heading title="App Version" />
          <div className="flex flex-col gap-2 max-w-[285px]">
            <p className="text-[14px] font-medium text-dark-blue">
              Web Version
            </p>
            <NumberInput
              placeholder="Add web version here..."
              disabled={!isEditing}
              decimalScale={2}
              hideControls
              {...appInformationForm.getInputProps("webVersion")}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[285px]">
            <p className="text-[14px] font-medium text-dark-blue">
              Android Version
            </p>
            <NumberInput
              placeholder="Add Android version here..."
              disabled={!isEditing}
              decimalScale={2}
              hideControls
              {...appInformationForm.getInputProps("androidVersion")}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[285px]">
            <p className="text-[14px] font-medium text-dark-blue">
              iOS Version
            </p>
            <NumberInput
              placeholder="Add iOS version here..."
              disabled={!isEditing}
              decimalScale={2}
              hideControls
              {...appInformationForm.getInputProps("iosVersion")}
            />
          </div>
        </div>

        {/* Release Notes */}
        <div className="flex flex-col gap-2">
          <Heading title="Latest Release Notes" />
          {appInformationForm.values.latestReleaseNotes.length > 0 ? (
            appInformationForm.values.latestReleaseNotes.map(
              (releaseNote, index) => (
                <ReleaseNotesInput
                  key={index}
                  value={releaseNote}
                  onChange={(value) => {
                    // Find the release note with the same index and update its value
                    const updatedNotes = [
                      ...appInformationForm.values.latestReleaseNotes,
                    ];
                    updatedNotes[index] = value;
                    appInformationForm.setFieldValue(
                      "latestReleaseNotes",
                      updatedNotes
                    );
                  }}
                  onDelete={() => {
                    // Remove the release note with the same index
                    const updatedNotes = [
                      ...appInformationForm.values.latestReleaseNotes,
                    ];
                    updatedNotes.splice(index, 1);
                    appInformationForm.setFieldValue(
                      "latestReleaseNotes",
                      updatedNotes
                    );
                  }}
                  error={
                    !releaseNote && appInformationForm.errors.latestReleaseNotes
                  }
                  isEditing={isEditing}
                />
              )
            )
          ) : (
            <span className="text-[14px] text-gray-400">
              No release notes added yet.
            </span>
          )}
          {isEditing && (
            <AddReleaseNotesButton
              onClick={() => {
                appInformationForm.setFieldValue("latestReleaseNotes", [
                  ...appInformationForm.values.latestReleaseNotes,
                  "",
                ]);
              }}
            />
          )}
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-2">
          <Heading title="Contact" />
          <div className="flex flex-col gap-2 max-w-[285px]">
            <p className="text-[14px] font-medium text-dark-blue">Email</p>
            <TextInput
              placeholder="Add email here..."
              disabled={!isEditing}
              {...appInformationForm.getInputProps("email")}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[285px]">
            <p className="text-[14px] font-medium text-dark-blue">Website</p>
            <TextInput
              placeholder="Add website here..."
              disabled={!isEditing}
              {...appInformationForm.getInputProps("website")}
            />
          </div>
        </div>

        {/* Action Button */}
        {isEditing && (
          <div className="flex gap-4 mt-4">
            <Button
              type="submit"
              label="Save Details"
              buttonColor="#2A85FF"
              buttonType="contained"
              className="!w-fit"
            />
            <Button
              type="button"
              label="Cancel"
              buttonType="outlined"
              borderColor="#FF613E"
              onClick={() => {
                setIsEditing(false);
              }}
              className="!w-fit !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
            />
          </div>
        )}
      </form>
    </section>
  );
};

export default AppInformation;
