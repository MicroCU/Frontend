"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/context/Translation";

export default function Example() {
  const { dict } = useTranslation();

  return (
    <div>
      <LanguageSwitcher />
      <p> {dict["onboard.welcome.title"]} </p>
    </div>
  );
}
