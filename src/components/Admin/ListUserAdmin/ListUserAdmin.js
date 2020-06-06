import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import User from "../User/User";
import { withAxios } from "../../../axios/index";
import Pagination from "../../Pagination/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "../../Alert/Alert";
import DialogEditUser from "../DialogEditUser/DialogEditUser";
import { ALERT_TYPE } from "../../../constant/alert";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
}));

const ListUserAdmin = ({
  listUser,
  type,
  activePage,
  itemPerPage,
  totalUser,
  handlePageChange,
  deleteClass,
}) => {
  const classes = useStyles();
  const [statusEdit, setStatusEdit] = useState({ status: false, user: {} });
  const [isDelete, setIsDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState(ALERT_TYPE.SUCCESS);

  useEffect(() => {}, [statusEdit]);

  const clearMessage = () => {
    setMessage("");
  };

  const handleEditUser = ({ statusEdit }) => {
    if (statusEdit) {
      setStatusEdit(statusEdit);
    }
  };

  const handleDelete = ({ isDelete }) => {
    if (isDelete) {
      setMessage("Delete user");
      setIsDelete(false);
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Họ Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUser &&
                  listUser.map((user) => (
                    <User
                      key={`admin-user-${user.id}`}
                      user={user}
                      handleDelete={handleDelete}
                      handleEditUser={handleEditUser}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Pagination
          activePage={activePage}
          itemPerPage={itemPerPage}
          totalItems={totalUser}
          handlePageChange={(e, value) => handlePageChange(e, value)}
        />
      </Container>
      <DialogEditUser
        isEdit={statusEdit.status}
        user={statusEdit.user}
        handleEditUser={handleEditUser}
      />
      {message ? (
        <Alert message={message} clearMessage={clearMessage} type={typeAlert} />
      ) : null}
    </div>
  );
};
export default withAxios(ListUserAdmin);