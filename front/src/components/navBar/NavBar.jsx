import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";
import CrumbList from "../crumbs/CrumbList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonWithQuestion from "../buttonWithQuestion/ButtonWithQuestion";
import GlobalMessage from "../globalMessage/GlobalMessage";
import { useAdminLogOut } from "../../functions/useAdminLogOut";
import { getLocationKey } from "./functions/getLocationKey";

const navKeys = {
  БАЗЫ: "/locations",
  ЧАТ: "/chat",
  "БЫСТРЫЙ ПОИСК": "/quick",
  АДМИНЫ: "/users-list",
  КЛИЕНТЫ: "/clients",
  ГЛАВНАЯ: "/",
  "Личный кабинет": "/user-account",
  "НАШИ БАЗЫ": "/locations",
  Вход: "/authentification",
  "Оставить контактные данные": "/registration",
};

function NavBar() {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [updateMessage, setUpdateMessage] = useState("");

  let pages = user
    ? [
        "ГЛАВНАЯ",
        "БАЗЫ",
        "БЫСТРЫЙ ПОИСК",
        "АДМИНЫ",
        "КЛИЕНТЫ",
        "АДМИНИСТРИРОВАНИЕ",
        // "СОЗДАТЬ НОВОСТЬ",
        // "РЕДАКТИРОВАТЬ ГЛАВНУЮ",
      ]
    : ["ГЛАВНАЯ", "НАШИ БАЗЫ", "О НАС", "КОНТАКТЫ", "МОИ ЗАЯВКИ", "НОВОСТИ"];

  const adminLogOutFetch = useAdminLogOut({ setUpdateMessage });

  const defaultSettengs = user
    ? [
        {
          page: "Личный кабинет",
          cb: (hc) => {
            hc();
            navigate("/user-account");
          },
        },
        {
          page: "Выход",
          cb: () => {
            setSettings([
              {
                page: "ДА",
                cb: (hc) => {
                  hc();
                  adminLogOutFetch();
                  setTimeout(() => {
                    setSettings(defaultSettengs);
                  }, 100);
                },
              },
              {
                page: "НЕТ",
                cb: (hc) => {
                  hc();
                  setTimeout(() => {
                    setSettings(defaultSettengs);
                  }, 100);
                },
              },
            ]);
          },
        },
      ]
    : [
        {
          page: "Вход",
          cb: (hc) => {
            hc();
            navigate("/authentification");
          },
        },
        {
          page: "Оставить контактные данные",
          cb: (hc) => {
            hc();
            navigate("/registration");
          },
        },
      ];
  const [settings, setSettings] = useState(defaultSettengs);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e, page) => {
    const text = e.target.innerText.toUpperCase();
    const nav = navKeys[text];
    nav && navKeys[page] !== `/${locationKey}` && navigate(nav);
    setAnchorElNav(null);
  };

  const locationKey = getLocationKey(location.pathname);

  // console.log(getLocationKey(location.pathname)) // ok

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1, backgroundColor: "#212121" }}>
        {user && <div id="heloo">Привет, {user.name} !</div>}
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleCloseNavMenu(e, page)}
                  sx={{
                    my: 1,
                    color: `${
                      navKeys[page] === `/${locationKey}`
                        ? "rgb(250, 79, 241)"
                        : "white"
                    }`,
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Tooltip title="назад">
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </Button>
            </Tooltip>

            <ButtonWithQuestion
              menuPunkt={settings}
              color={"white"}
              fontSize={20}
              buttonContent={() => {
                if (user) {
                  return <Avatar alt="Remy Sharp" src={user.image} />;
                }
                return <Avatar alt="Remy Sharp" src={""} />;
              }}
              hcCB={() => {}}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <CrumbList />

      <Outlet />
      {updateMessage && (
        <GlobalMessage
          color={"red"}
          updateMessage={updateMessage}
          cb={() => setUpdateMessage("")}
        />
      )}
    </>
  );
}
export default NavBar;
