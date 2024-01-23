import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import OnBoardContent from "./onboard";

export default async function IndexPage({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <OnBoardContent dictionary={dictionary.onboard} />;
}
