import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Button from "../../../components/ui/Button";

export const LoginForm = () => {
  // useForm Hook from Mantine Dev
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid Email Address!",
      password: (value) =>
        value.length >= 4 ? null : "Password must be at least 4 characters.",
    },
  });

  const handleFormSubmit = () => {};

  return (
    <form
      onSubmit={form.onSubmit(handleFormSubmit)}
      className="mt-[32px] flex flex-col gap-[16px]"
    >
      <TextInput
        label="Email"
        placeholder="hi@example.com"
        {...form.getInputProps("email")}
        className="w-full font-medium"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        {...form.getInputProps("password")}
        className="w-full font-medium"
      />
      <Button
        id="login-button"
        type="submit"
        label="Login"
        disabled={
          form.getValues().email === "" || form.getValues().password === ""
        }
        className="w-full text-[16px] font-bold mt-[16px]"
        buttonType="contained"
      />
    </form>
  );
};
