import { PathContextProvider } from "@/context/Path";

export default function PathLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <PathContextProvider>{children}</PathContextProvider>;
}
