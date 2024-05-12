import LoginPanel from "./LoginPanel";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="container relative h-screen flex-col items-center justify-center sm:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className="col-span-2">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <section className="space-y-2">
            <h1 className="Bold32 text-black font-semibold tracking-tight">
              Login
            </h1>
            <h1 className="Reg14 text-grayMedium font-semibold">
              Please login with either of the following choices.
            </h1>
          </section>
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
