import { Skeleton } from "@mantine/core";
import EditUserDetailsForm from "./FormComponents";
import React from "react";

const EditUserProfileSkeleton = () => {
  return (
    <EditUserDetailsForm.UserDetailsFormRoot>
      <EditUserDetailsForm.UserDetailFormSection>
        <React.Fragment>
          <Skeleton height={100} width={100} circle />
          <EditUserDetailsForm.UserDetailsFormRow>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height={78} width="100%" />
              ))}
          </EditUserDetailsForm.UserDetailsFormRow>
        </React.Fragment>
      </EditUserDetailsForm.UserDetailFormSection>
      <EditUserDetailsForm.UserDetailFormSection>
        <React.Fragment>
          <Skeleton height={100} width={100} circle />
          <EditUserDetailsForm.UserDetailsFormRow>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height={78} width="100%" />
              ))}
          </EditUserDetailsForm.UserDetailsFormRow>
        </React.Fragment>
      </EditUserDetailsForm.UserDetailFormSection>
      <EditUserDetailsForm.UserDetailFormSection>
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={234} width="100%" />
          ))}
      </EditUserDetailsForm.UserDetailFormSection>
    </EditUserDetailsForm.UserDetailsFormRoot>
  );
};

export default EditUserProfileSkeleton;
