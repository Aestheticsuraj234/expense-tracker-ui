"use client";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {BackButton} from "./back-button";
import {Header} from "./header";
import {Social} from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showForgotPassword?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showForgotPassword,
}: CardWrapperProps) => {
  return (
    <Card className="md:w-[25rem] w-[21rem] shadow-md mx-5 bg-white dark:bg-zinc-800 ">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center items-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
        {showForgotPassword && (
          <BackButton label="Forgot Password?" href="/forgot-password" />
        )}
      </CardFooter>
    </Card>
  );
};