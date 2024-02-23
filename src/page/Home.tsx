import {
  AppBar,
  // Avatar,
  BottomNavigation,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { Service } from "../api/service";
import { useState } from "react";
import { MovieGetSearch } from "../model/searchModel";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "../css/appbar.css";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchValue.length > 0) {
      // เรียกใช้ฟังก์ชั่นค้นหา
      console.log("ค้นหา:", searchValue);
      console.log("page handle key press " + page);
      setPage(1);
      // btnClickName(searchValue);
      btnClickNamePage(searchValue, 1);
    } else if (e.key === "Enter" && searchValue.length <= 0) {
      alert("กรุณาใส่ข้อมูลก่อนค้นหา !!!");
    }
  };

  const [movie, setMovie] = useState<MovieGetSearch>();
  const navigate = useNavigate();
  // const nameRef = useRef<HTMLInputElement>(null);
  // let nameInput = "";
  const services = new Service();

  function navigateTo(id:string) {
    console.log("Log Navigate| "+id);
    
    navigate(`/movie?id=${id}`);
    
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar" position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {movie ? (
          movie.Search.map((e) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={e.imdbID}>
              <Card>
                <CardActionArea id={e.imdbID} onClick={() => navigateTo(String(e.imdbID))}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={e.Poster}
                    alt={e.Title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {e.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {e.Year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          // แสดง CircularProgress ขณะโหลดข้อมูล
          <Grid item xs={12} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <CircularProgress />
            <Typography>
              ยังไม่มีข้อมูลการค้นหา...
            </Typography>
          </Grid>
        )}
      </Grid>

      <div>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels className="appbar">
            <Stack direction="row" spacing={5}>
              <Button
                variant="outlined"
                onClick={() => {
                  console.log("page arrow back " + page);
                  if (page > 1) {
                    setPage(page - 1);
                    btnClickNamePage(searchValue, page - 1);
                  }
                }}
              >
                <ArrowBackIosNewIcon />
              </Button>

              <Button variant="outlined" disabled>
                {page + "-" + Math.ceil(Number(movie?.totalResults) / 10)}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (
                    page != 0 &&
                    page < Math.ceil(Number(movie?.totalResults) / 10)
                  ) {
                    setPage(page + 1);
                    btnClickNamePage(searchValue, page + 1);
                  }

                  console.log("page arrow forward " + page);
                }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Stack>
          </BottomNavigation>
        </Paper>
      </div>
    </>
  );

  async function btnClickNamePage(name: string, page: number) {
    const res = await services.getMovieByNamePage(name, page);
    setMovie(res);

    console.log(
      "Res Btn Click Name " + typeof Boolean(res.Response) + " " + res.Response
    );
    if (res.Response === "False") {
      console.log(res.Response);
    }
    console.log(res);
  }
}

export default HomePage;
