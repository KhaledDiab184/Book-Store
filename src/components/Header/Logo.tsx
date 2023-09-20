import { Badge, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <Group position="apart" sx={{ height: "100%" }}>
      <NavLink to="/" className="navbar-brand ">
        <Badge size="xl" radius="md" variant="dot">
          Book Store
        </Badge>
      </NavLink>
    </Group>
  );
};

export default Logo;
