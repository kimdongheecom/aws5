import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지"
};

export default function LoginPage() {
  return <LoginForm />;
}
