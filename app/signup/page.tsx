"use client";

import React, { useState } from "react";
import { SignupEmail } from "./SignUpEmail";
import { SignupPassword } from "./SignUpPassword";

import { LogImage } from "./LogImage";

const SignupPage = () => {
  const [step, setStep] = useState<number>(0);
  const StepComponents = [SignupEmail, SignupPassword][step];
  const [email, setEmail] = useState<string>("");

  const handleNextStep = (email: string) => {
    setEmail(email);
    setStep(1);
  };

  return (
    <div className="w-360 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <StepComponents
          email={email}
          setStep={setStep}
          handleNextStep={handleNextStep}
        />
      </div>
      <LogImage />
    </div>
  );
};
export default SignupPage;
