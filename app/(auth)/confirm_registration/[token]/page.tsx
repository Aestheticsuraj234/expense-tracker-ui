"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

const ConfirmRegistration = ({ params }: { params: { token: string } }) => {
  const { token } = params;

  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);

  const handleConfirmation = async () => {
    try {
      const confirmed = await axios.post(`http://140.238.227.78:8080/confirm_registration/${token}`)
      setIsConfirmed(!!confirmed.data);
      if (confirmed.status === 200) {
        toast.success("Registration Confirmed!");
          window.location.href = "/sign-in";
      } else {
        toast.error("Confirmation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error handling confirmation:", error);
      setIsConfirmed(false);
    }
  };

  useEffect(() => {
    handleConfirmation();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col px-4 space-y-4 mt-10">
      <Image
        src={"/confirm_registration.svg"}
        alt={"confirm-registration"}
        width={450}
        height={450}
        className="md:mb-0 mb-2"
      />
      <div className="flex items-center justify-center flex-col">
        {isConfirmed === null ? (
            <>
          <Loader2 className="w-12 h-12 animate-spin" />
          <h1 className="text-3xl font-bold transition-all ">Confirming Registration</h1>
          </>
        ) : isConfirmed ? (
          <>
            <CheckCircle className="w-12 h-12 text-emerald-600" />
            <h1 className="text-3xl font-bold transition-all ">Registration Confirmed</h1>
          </>
        ) : (
          <h1 className="text-3xl font-bold transition-all ">Confirmation Failed</h1>
        )}
      </div>
    </div>
  );
};

export default ConfirmRegistration;
