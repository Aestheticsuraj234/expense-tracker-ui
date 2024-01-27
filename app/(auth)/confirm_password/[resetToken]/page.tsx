"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

const ConfirmPassword = ({ params }: { params: { resetToken: string } }) => {
  const { resetToken } = params;
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    const handleConfirmation = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/confirm_password/${resetToken}`);
        const confirmed = response.data;

        setIsConfirmed(confirmed);

        if (confirmed) {
          toast.success("Password Reset Successfully!");
          window.location.href = "/sign-in";
        } else {
          toast.error("Confirmation failed. Please try again.");
        }
      } catch (error) {
        console.error("Error handling confirmation:", error);
        setIsConfirmed(false);
        toast.error("An error occurred. Please try again later.");
      }
    };

    handleConfirmation();
  }, [resetToken]);

  return (
    <div className="flex justify-center items-center flex-col px-4 space-y-4 mt-10">
      <Image
        src={"/password_confirm.svg"}
        alt={"confirm-registration"}
        width={450}
        height={450}
        className="md:mb-0 mb-2"
      />
      <div className="flex items-center justify-center flex-col">
        {isConfirmed === null ? (
          <>
            <Loader2 className="w-12 h-12 animate-spin" />
            <h1 className="text-3xl font-bold transition-all ">Confirming Password</h1>
          </>
        ) : isConfirmed ? (
          <>
            <CheckCircle className="w-12 h-12 text-emerald-600" />
            <h1 className="text-3xl font-bold transition-all ">Password Confirmed</h1>
          </>
        ) : (
          <h1 className="text-3xl font-bold transition-all ">Confirmation Failed</h1>
        )}
      </div>
    </div>
  );
};

export default ConfirmPassword;
