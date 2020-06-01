import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import addFile from "../utils/addFile";
import { useParams } from "react-router-dom";
import { withAxios } from "../../axios/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  button: {
    backgroundColor: "blue",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const DetailHomeWork = ({ axios, exercise }) => {
  const classes = useStyles();
  const [nameFile, setNameFile] = useState("Chưa chọn file");
  const [isAddFile, setIsAddFile] = useState(false);
  const [dataFile, setDataFile] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `/exercises/${id}/files?filter_by=user_id?filter_value=${userId}&order_type=ASC&page_token=1&page_size=20`
      )
      .then((response) => {
        if (response.data.files.length > 0) {
          setNameFile(response.data.files[0].name);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, userId]);
  const selectFile = (e) => {
    const file = e.target.files[0];
    new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        resolve(evt.target.result);
      };
      reader.readAsText(file);
      reader.onerror = reject;
    })
      .then((data) => {
        setDataFile(data);
      })
      .catch(function (err) {
        console.error(err);
      });

    setNameFile(e.target.files[0].name);
    setIsAddFile(true);
  };
  const submitFile = () => {
    const dataRequest = {
      exercise_id: exercise.id,
      name: nameFile,
      data: dataFile,
    };
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post("/files", dataRequest, {
        headers: header,
      })
      .then((response) => {
        console.log("submitFile -> response", response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const renderButton = () => {
    if (nameFile !== "Chưa chọn file" && !isAddFile) {
      return (
        <Button size="small" fullWidth color="primary" variant="contained">
          Hủy
        </Button>
      );
    } else {
      if (isAddFile) {
        return (
          <Button
            size="small"
            fullWidth
            color="primary"
            onClick={submitFile}
            variant="contained"
          >
            Nộp
          </Button>
        );
      } else {
        return (
          <Button
            size="small"
            fullWidth
            color="primary"
            onClick={() => addFile((e) => selectFile(e))}
            variant="contained"
          >
            Chọn file
          </Button>
        );
      }
    }
  };
  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md">
        <Grid xs={12} item container>
          <Grid item xs={8}>
            <Paper elevation={0}>
              <h2>{exercise.name}</h2>
              <p>{exercise.description}</p>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardContent>
                <h3>Bài Nộp</h3>
                <p>{nameFile}</p>
              </CardContent>
              <CardActions>{renderButton()}</CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withAxios(DetailHomeWork);
