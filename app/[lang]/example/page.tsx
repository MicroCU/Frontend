"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Lottie from "@/components/Lottie";
import I18nTypo from "@/components/ui/I18nTypo";
import { useAuth } from "@/context/Auth";
import { useTranslation } from "@/context/Translation";
import Link from "next/link";

export default function Example() {
  const { lang, dict } = useTranslation();
  const { user } = useAuth();
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
    </div>
  );
}
