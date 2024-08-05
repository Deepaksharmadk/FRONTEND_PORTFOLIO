import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Logout from "../Button/Logout";
import Login from "../Button/Login";

function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="flex px-3 py-2 justify-end items-center">
      <div className="text-blue-400 flex">
        <div className="text-blue-400">
          {isLoggedIn ? (
            <>
              <Logout />
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
