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
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";
import CrumbList from "../crumbs/CrumbList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonWithQuestion from "../buttonWithQuestion/ButtonWithQuestion";
import GlobalMessage from "../globalMessage/GlobalMessage";
import { useAdminLogOut } from "../../functions/useAdminLogOut";

const navKeys = {
  БАЗЫ: "/locations",
  ЧАТ: "/chat",
  "БЫСТРЫЙ ПОИСК": "/quick",
  АДМИНЫ: "/users",
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

  const [updateMessage, setUpdateMessage] = useState("");

  let pages = user
    ? ["ГЛАВНАЯ", "БАЗЫ", "ЧАТ", "БЫСТРЫЙ ПОИСК", "АДМИНЫ", "КЛИЕНТЫ"]
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

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    const text = e.target.innerText.toUpperCase();
    const nav = navKeys[text];
    nav && navigate(nav);
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1, backgroundColor: "#212121" }}>
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
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
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
