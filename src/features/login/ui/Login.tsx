"use client";

import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { cn } from "@/shared/lib";
import { Button, Input, PatchedLink } from "@/shared/ui";
import { loginAction } from "../model/login";
import { AuthStatus } from "../model/types";
import "./login.scss";

export interface LoginProps {
  className?: string;
}

const block = cn("login");

export function Login({ className }: LoginProps) {
  const [state, action, isPending] = useActionState(loginAction, {
    status: AuthStatus.INITIAL,
    fieldValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.status === AuthStatus.SUCCESS) {
      redirect("/profile");
    }
  }, [state]);

  return (
    <form action={action} className={block("", [className])}>
      <Input
        defaultValue={state.fieldValues.email}
        errorMessage={state.errors?.email?.[0]}
        label="Email"
        name="email"
        placeholder="Email"
      />
      <Input
        defaultValue={state.fieldValues.password}
        errorMessage={state.errors?.password?.[0]}
        label="Password"
        name="password"
        placeholder="Password"
      />
      <Button
        disabled={isPending}
        fullWidth
        type="submit"
        variant="contained-black"
      >
        Вход
      </Button>
      <PatchedLink href="/restore">Забыли пароль?</PatchedLink>
    </form>
  );
}
