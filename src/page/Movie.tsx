/* eslint-disable react-hooks/exhaustive-deps */
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Service } from "../api/service";
import { MovieGetRequest } from "../model/movieModel";

function MoviePage() {
  const [searchParam] = useSearchParams();
  const id = String(searchParam.get("id"));
  const [movie, setMovie] = useState<MovieGetRequest>();
  const [loading, setLoading] = useState(false);

  const services = new Service();

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: string) => {
    setLoading(true);
    try {
      const res = await services.getMovieById(id);
      setMovie(res);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{display:'flex',flexDirection:'column'}}>
            <CircularProgress />
        </div>
      ) : (
        <div style={{ padding: '15vh' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card>
                <CardActionArea id={movie?.imdbID}>
                  <CardMedia
                    component="img"
                    height="345px"
                    image={movie?.Poster}
                    alt={movie?.Title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {movie?.Title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {movie?.Genre} | {movie?.Year} | {movie?.Runtime}
                    </Typography>
                    <Typography variant="body2">{movie?.Plot}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" href={movie?.Website}>
                    Visit Website
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">{movie?.Title}</Typography>
              <Typography variant="body1">
                Rated: {movie?.Rated} | Released: {movie?.Released}
              </Typography>
              <Typography variant="body1">
                Director: {movie?.Director}
              </Typography>
              <Typography variant="body1">Writer: {movie?.Writer}</Typography>
              <Typography variant="body1">Actors: {movie?.Actors}</Typography>
              <Typography variant="body1">
                Language: {movie?.Language}
              </Typography>
              <Typography variant="body1">Country: {movie?.Country}</Typography>
              <Typography variant="body1">Awards: {movie?.Awards}</Typography>
              <Typography variant="body1">
                Metascore: {movie?.Metascore}
              </Typography>
              <Typography variant="body1">
                IMDb Rating: {movie?.imdbRating}
              </Typography>
              <Typography variant="body1">
                IMDb Votes: {movie?.imdbVotes}
              </Typography>
              <Typography variant="body1">IMDb ID: {movie?.imdbID}</Typography>
              <Typography variant="body1">Type: {movie?.Type}</Typography>
              <Typography variant="body1">DVD: {movie?.DVD}</Typography>
              <Typography variant="body1">
                Box Office: {movie?.BoxOffice}
              </Typography>
              <Typography variant="body1">
                Production: {movie?.Production}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default MoviePage;
