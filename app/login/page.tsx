"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const loggedInEmail = localStorage.getItem("userEmail");
      if (loggedInEmail) {
        router.push("/");
      }
    }
  }, []);

  const onLogin = async () => {
    const result = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await result.json();
    if (response.success) {
      localStorage.setItem("userEmail", email);
      router.push("/");
    } else {
      alert("Login failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-60">
        <p>Email</p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <Input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outline" onClick={onLogin}>
          Login
        </Button>
        <p>
          Didnt have an account{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
