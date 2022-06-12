import React from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { MovieList } from "..";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from "../../assets/genres";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import useStyles from "./styles";

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      id,
    });
  const dispatch = useDispatch();
  const isMovieFavorited = true;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  // console.log(recommendations);

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something went wrong - Go back.</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          className={classes.poster}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data?.release_date.split("-")[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display='flex' align='center'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant='subtitle1'
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime} min
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => (
            <Link
              className={classes.links}
              to='/'
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              key={index}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Top Casts
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits?.cast
              ?.map(
                (character, i) =>
                  character?.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color='textPrimary'>
                        {character?.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character?.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='sm' variant='outlined'>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${data?.imdb?.id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button onClick={() => {}} href='#' endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='sm' variant='outlined'>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "unfavorite" : "favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to='/'
                    color='inherit'
                    variant='subtitle2'
                    style={{ textDecoration: "none" }}
                  >
                    back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
    </Grid>
  );
};

export default MovieInformation;
