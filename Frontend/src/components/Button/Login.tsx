import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../Theme/mode-toggle";

function Login() {
  return (
    <div className="flex px-3 py-2 justify-end items-center">
      <div>
        <Button variant="outline" className="mr-5">
          <Link className="text-sm" to="/sign-in">
            Login
          </Link>
        </Button>
      </div>
      <div className="text-blue-400">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Login;
