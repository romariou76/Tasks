import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";


export function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  console.log(isAuthenticated, user)

  return (
    <Navbar className="bg-indigo-400 " >
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>

      {isAuthenticated ? (
        <>
          {/* <li>
               Bienvenido {user.username}
            </li>
            <li>
              <Button><Link to="/add-task">Agregar</Link></Button>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar Sesion
              </Link>
            </li> */}
          <Button><Link to="/add-task">Agregar</Link></Button>
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu className="text-black" aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold text-gray-500">Iniciaste sesion como</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                {/* <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                <DropdownItem key="logout" color="danger" to="/" onClick={() => logout()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
      ) : (
        <>
          <ul className="flex gap-2">
            <li>
              <Button><Link to="/login">Login</Link></Button>
            </li>
            <li>
              <Button><Link to="/register">Register</Link></Button>
            </li>
          </ul>

        </>
      )}


    </Navbar>
  );
}
