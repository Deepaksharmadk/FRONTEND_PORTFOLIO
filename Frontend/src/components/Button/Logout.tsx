import { logout } from "@/redux/slice/authSlice";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { useLogoutRtkMutation } from "@/redux/slice/userApi";
import { AvatarFile } from "../Avatar/Avatar";
import { ModeToggle } from "../Theme/mode-toggle";

function Logout() {
  const dispatch = useDispatch();
  const [logoutRtk] = useLogoutRtkMutation();

  const logoutBtn = async () => {
    try {
      const userData = localStorage.getItem("userdata");
      if (userData) {
        await logoutRtk();

        dispatch(logout());

        localStorage.removeItem("userdata");

        toast({
          title: "Logout successful.",
          description: "You have been successfully logged out.",
          variant: "success",
        });
      } else {
        toast({
          title: "No user data found.",
          description: "You are not logged in.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);

      toast({
        title: "Logout failed.",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex px-3 py-2 justify-end items-center ">
      <div>
        <Button onClick={logoutBtn} variant="outline" className="mr-5">
          Logout
        </Button>
      </div>
      <div className="">
        <ModeToggle />
      </div>
      <div className="ml-7">
        <AvatarFile />
      </div>
    </div>
  );
}

export default Logout;
