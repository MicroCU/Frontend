"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/Auth";
import { useTranslation } from "@/context/Translation";

export default function Example() {
  const { dict } = useTranslation();
  const { user } = useAuth();
  return (
    <div>
      <LanguageSwitcher />
      <p> {dict["onboard.welcome.title"]} </p>
      <div>
        <p> {user?.id || "Not found ID"}</p>
        <p> {user?.name || "Not found Name"}</p>
      </div>
    </div>
  );
}
