import { JourneyGraphContextProvider } from "@/context/JourneysGraph";

export default function PathLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <JourneyGraphContextProvider>{children}</JourneyGraphContextProvider>;
}
