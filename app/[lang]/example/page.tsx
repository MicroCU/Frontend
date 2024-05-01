"use client";
import { storeMCVPref } from "@/action/onboard";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import I18nTypo from "@/components/ui/I18nTypo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";
import { useOnBoard } from "@/context/Onboard";
import { useTranslation } from "@/context/Translation";
import Link from "next/link";

export default function Example() {
  const { lang, dict } = useTranslation();
  const { user } = useAuth();
  const { answer } = useOnBoard();

  if (!user) return null;
  return (
    <div>
      <LanguageSwitcher />
      <I18nTypo> {dict["onboard.welcome.title"]} </I18nTypo>
      <div>
        <p> {user ? user.id : "Not found ID"}</p>
        <p> {user ? user.name : "Not found Name"}</p>
      </div>
      <Link href={`/${lang}/try`}> To Another Page </Link>
      <Button
        onClick={() => {
          storeMCVPref(answer);
        }}
      >
        Test Store
      </Button>
    </div>
  );
}
