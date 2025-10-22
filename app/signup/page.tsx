"use client";
import React, { useState } from "react";
import { SignUpEmail } from "./SignUpEmail";
import { SignUpPassword } from "./SignUpPassword";
import { toast } from "sonner";
import Image from "next/image";

const SignUp = () => {
  const [step, setStep] = useState(0);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handleBackStep = () => step > 0 && setStep((prev) => prev - 1);

  const handleSubmitAll = async () => {
    try {
      const res = await fetch(
        "https://food-backend-lac.vercel.app/api/userdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );
      const data = await res.json();
      console.log(" Success:", data);

      toast(data.message);
    } catch (err) {
      console.error(" Error:", err);
    }
  };

  return (
    <div className="flex gap-12 m-5">
      <div className="flex items-center justify-center ml-25">
        {step === 0 && (
          <SignUpEmail
            email={formValues.email}
            setEmail={(email: string) =>
              setFormValues((prev) => ({ ...prev, email }))
            }
            handleNextStep={handleNextStep}
          />
        )}

        {step === 1 && (
          <SignUpPassword
            password={formValues.password}
            setPassword={(password: string) =>
              setFormValues((prev) => ({ ...prev, password }))
            }
            handleBackStep={handleBackStep}
            handleSubmitAll={handleSubmitAll}
          />
        )}
      </div>

      <Image
        src="/images/Hurgelt.png"
        alt="Today's Offer"
        className="w-full h-full"
      />
    </div>
  );
};

export default SignUp;
