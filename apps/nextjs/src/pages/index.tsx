import type { NextPage } from "next";
import Homepage from "./home/Homepage";
import { useAuth } from "@clerk/nextjs";
import RedirectToLogin from "./redirectToLogin/RedirectToLogin";



const Home: NextPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <>
      <Homepage />
    </>
  } else {
    return <RedirectToLogin />
  }
};

export default Home;
