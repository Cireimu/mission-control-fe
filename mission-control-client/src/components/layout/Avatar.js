import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import decrypt from '../../utils/decrypt'

const AvatarMenu = () => {
  let history = useHistory();

  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("fname");

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
      setOpen(true)
  };

  const handleClose = () => {
      setOpen(false)
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          {localStorage.getItem("avatar") && (
            <Avatar
              src={avatar}
              {...bindTrigger(popupState)}
              className="logged-in avatar"
            />
          )}
          {!localStorage.getItem("avatar") && (
            <Avatar {...bindTrigger(popupState)} className="logged-in avatar">
              {name ? name[0] : "U"}
            </Avatar>
          )}
          <Menu {...bindMenu(popupState)}>
            <Link to={`/profile/${localStorage.getItem('fname')}/edit/email`} className="nav-head">
              <MenuItem style={{ fontSize: "1.4rem" }} onClick = {handleOpen}>Edit Profile</MenuItem>
            </Link>
            {
              decrypt() === 'admin' ?
              <Link to={`/admin/${localStorage.getItem('fname')}/edit/promotions`} className="nav-head">
                <MenuItem style={{ fontSize: "1.4rem" }} onClick = {handleOpen}>Promote Users</MenuItem>
              </Link>
              : null
            }
            <MenuItem onClick={logout} style={{ fontSize: "1.4rem" }}>
              Sign Out
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};

const mapStateToProps = state => {
  return{
    userRole: state
  }
}
export default AvatarMenu;
