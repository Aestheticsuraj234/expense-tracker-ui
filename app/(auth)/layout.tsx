import AuthNavbar from "./components/auth-navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <AuthNavbar />
      <div className="px-16  mt-20 ">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
