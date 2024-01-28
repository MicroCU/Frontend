import { Metadata } from "next";
import LoginPanel from "./login";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login"
};

const LoginPage = () => {
  return (
    <div className="container relative h-screen flex-col items-center justify-center sm:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className="col-span-2">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-8 sm:w-[400px]">
          <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
          <LoginPanel />
          <div className="space-x-1  text-center text-grayMedium">
            <Link href="" className="text-primary">
              Policy
            </Link>
            <span>updated on 06 Jan 2023</span>
          </div>
        </div>
      </div>
      <AuthBg />
    </div>
  );
};

export default LoginPage;

const AuthBg = () => {
  return (
    <div className="relative col-span-3 hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-danger" />
      <div className="relative z-20 flex text-lg font-medium">
        Powered by &nbsp;
        <a href="https://www.mycourseville.com/" className="underline">
          MyCourseVille
        </a>
      </div>
    </div>
  );
};
