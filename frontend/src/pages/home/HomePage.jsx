import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
function HomePage() {
  const { user } = useAuthStore();

  return (
    // <div className="  hero-bg absolute  h-screen w-full object-cover object-center"/>

    <>{user ? <HomeScreen /> : <AuthScreen />}</>
  );
}

export default HomePage;
