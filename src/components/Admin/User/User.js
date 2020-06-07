import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withAxios } from "../../../axios/index";

const User = ({ user, axios, handleDelete, handleEditUser }) => {
  const handleDeleteUser = () => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`/users/${user.id}`, {
        headers: header,
      })
      .then((response) => {
        handleDelete({ isDelete: true });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };
  return (
    <>
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            onClick={() =>
              handleEditUser({ statusEdit: { status: true, user: user } })
            }
          >
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteUser}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default withAxios(User);
