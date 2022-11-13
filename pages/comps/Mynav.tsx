import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from '@mui/material/Link';
import GroupsIcon from '@mui/icons-material/Groups';
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import LogoutIcon from '@mui/icons-material/Logout';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({params}) {
  var profilepath = "";
  var username = "";
  var loggedin = "";
  try {
    profilepath = "/user/" + params.username;
    loggedin = "Logged in as " + params.username;
  } catch {
    profilepath = "/user/" + "usernamewasundefined";
  }
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <a href="/home">
        <MenuItem>
          <IconButton
            sx={{color: "black" }}
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <GroupsIcon />
          </IconButton>
          <p style={{color: "black"}}>Teams</p>
        </MenuItem>
      </a>
      <a href="/notifications">
        <MenuItem>
          <IconButton
            sx={{color: "black" }}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p style={{color: "black"}}>Notifications</p>
        </MenuItem>
      </a>
      <a href={profilepath}>
        <MenuItem>
          <IconButton
            sx={{color: "black" }}
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p style={{color: "black"}}>{username}</p>
        </MenuItem>
      </a>
      <a href="/">
        <MenuItem>
          <IconButton
            sx={{color: "black" }}
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <p style={{color: "black"}}>Logout</p>
        </MenuItem>
      </a>
    </Menu>
  );

  return (
    <Box position="sticky" style={{position: "sticky"}} sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{position: "sticky"}}>
        <Toolbar>
          <Link style={{color: "#FFFFFF"}} href="/home">
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              IssueTrack
            </Typography>
          </Link>
          <Link style={{color: "#FFFFFF"}} href="/home">
            <BugReportOutlinedIcon fontSize='large'/>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Issues"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="View Teams" TransitionComponent={Zoom}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" href="/teams" sx={{ "&:hover": { color: "white" } }}>
                <Badge badgeContent={4} color="default">
                  <GroupsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" TransitionComponent={Zoom}>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" href="/events" sx={{ "&:hover": { color: "white" } }}>
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={loggedin} TransitionComponent={Zoom}>
              <IconButton size="large" aria-label="account of current user" color="inherit" href={profilepath} sx={{ "&:hover": { color: "white" } }}>
                <Badge color="default">
                    <AccountCircle />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="LogOut" TransitionComponent={Zoom}>
                <IconButton size="large" edge="end" aria-label="LogOut" aria-controls={menuId} color="inherit" href="/" sx={{ "&:hover": { color: "white" } }}>
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
