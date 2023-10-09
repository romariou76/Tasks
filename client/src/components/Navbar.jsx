import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import {Navbar,NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";


export function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  console.log(isAuthenticated, user)

  return (
    <Navbar >
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
               {user.username}
            </li>
            <li>
              <Button><Link to="/add-task">Agregar</Link></Button>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar Sesion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button><Link to="/login">Login</Link></Button>
            </li>
            <li>
              <Button><Link to="/register">Register</Link></Button>
            </li>
          </>
        )}
      </ul>
    </Navbar>
  );
}
