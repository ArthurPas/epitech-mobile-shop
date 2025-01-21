import RegisterForm from "@/components/register/RegisterForm";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="container mx-auto py-10 flex flex-col items-center w-full">
            <h3 className="text-3xl font-bold mb-4">Register</h3>
            <RegisterForm />
        </div>
    );
}
