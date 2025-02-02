import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Button from "../../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { authServices } from "./../../../services/authServices";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  // navigate hook from React Router
  const navigate = useNavigate();

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

  const loginMutation = useMutation({
    mutationFn: () =>
      authServices.login({
        email: form.values.email,
        password: form.values.password,
      }),
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
      toast.success("Authentication Sucessfull!", {
        description: "Welcome Back!",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error("Authentication Failed!", {
        description: error.message || "User Authentication failed!",
        duration: 3000,
      });
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(loginMutation.mutate)}
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
        className="w-full text-[16px] !font-bold mt-[16px]"
        buttonType="contained"
        isLoading={loginMutation.isPending}
      />
    </form>
  );
};
