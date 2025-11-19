import { RegisterForm } from "@/components/forms/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Create an account.",
};

export default function RegisterPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <RegisterForm />
        </div>
    );
}
