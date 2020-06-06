import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
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
import DialogEditClass from "../DialogEditClass/DialogEditClass";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
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

const ListClassesAdmin = ({
  listClass,
  type,
  activePage,
  itemPerPage,
  totalClass,
  handlePageChange,
  deleteClass,
  axios,
}) => {
  const classes = useStyles();
  const [clas, setClas] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState(ALERT_TYPE.SUCCESS);

  const clearMessage = () => {
    setMessage("");
  };

  const handleEditClass = ({ clas }) => {
    setClas(clas);
  };

  const handleDeleteClass = ({ clas }) => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`/classes/${clas.id}`, {
        headers: header,
      })
      .then((response) => {
        setMessage("Delete class");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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
                  <TableCell>Tên lớp</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Giáo viên</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listClass &&
                  listClass.map((clas) => (
                    <TableRow key={`list-class-wrap-class-${clas.id}`}>
                      <TableCell component="th" scope="row">
                        {clas.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {clas.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {clas &&
                          clas.teachers &&
                          clas.teachers.map((teacher) => (
                            <TableCell
                              key={`list-class-teacher-${teacher.id}`}
                              component="li"
                              scope="row"
                            >
                              {teacher.name}
                            </TableCell>
                          ))}
                      </TableCell>
                      <TableCell scope="row" align="right">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClass({ clas })}
                        >
                          <CreateIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClass({ clas })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Pagination
          activePage={activePage}
          itemPerPage={itemPerPage}
          totalItems={totalClass}
          handlePageChange={(e, value) => handlePageChange(e, value)}
        />
      </Container>
      <DialogEditClass clas={clas} handleEditClass={handleEditClass} />
      {message ? (
        <Alert message={message} clearMessage={clearMessage} type={typeAlert} />
      ) : null}
    </div>
  );
};
export default withAxios(ListClassesAdmin);