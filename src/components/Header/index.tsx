import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";

import { NavLink, useNavigate } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOut } from "../../redux/authSlice";
import Logo from "./Logo";
import { TiShoppingCart } from "react-icons/ti";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  person: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

const Layout = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { books } = useAppSelector((state) => state.books);

  return (
    <Box pb={10}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Logo />
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            ></HoverCard>
            {isAuth && (
              <NavLink to="/Dashboard" className={classes.link}>
                Dashboard
              </NavLink>
            )}
          </Group>
          {isAuth == false ? (
            <Group className={classes.hiddenMobile}>
              <NavLink to="/Login">
                <Button variant="default">Login </Button>
              </NavLink>

              <NavLink to="/Register">
                <Button> Sign up </Button>
              </NavLink>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <ul className="navbar-nav">
                <li className="nav-item mt-1 ">
                  <TiShoppingCart
                    onClick={() => {
                      navigate("/Cart", {
                        replace: true,
                      });
                    }}
                    style={{ fontSize: "30" }}
                  />
                  {books && books.length > 0 && books.length}
                </li>
              </ul>
              <Group>
                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user?.firstname} {user?.lastname}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {user?.email}
                  </Text>
                </div>
              </Group>

              <NavLink to="/Login">
                <Button
                  variant="default"
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/", { replace: true });
                  }}
                >
                  Logout{" "}
                </Button>
              </NavLink>
            </Group>
          )}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Logo />}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <NavLink to="/" className={classes.link}>
            Home
          </NavLink>

          <Collapse in={linksOpened}>{linksOpened}</Collapse>
          <NavLink to="/Dashboard" className={classes.link}>
            Dashboard
          </NavLink>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {isAuth == false ? (
            <Group position="center" pb="xl" px="md">
              <NavLink to="/Login">
                <Button variant="default"> Login </Button>
              </NavLink>
              <NavLink to="/Register">
                <Button> Sign up </Button>
              </NavLink>
            </Group>
          ) : (
            <Group position="center" pb="xl" px="md">
              <Group>
                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user?.firstname} {user?.lastname}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {user?.email}
                  </Text>
                </div>
              </Group>

              <NavLink to="/Login">
                <Button
                  variant="default"
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/", { replace: true });
                  }}
                >
                  Logout{" "}
                </Button>
              </NavLink>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Layout;
