import axios from "axios";
import { MovieGetRequest } from "../model/movieModel";
import { MovieGetSearch } from "../model/searchModel";

// eslint-disable-next-line react-refresh/only-export-components
const HOST: string = "http://www.omdbapi.com/";

export class Service {
  async getMovieByName(name:string) {
    const url = HOST + `?t=${name}&apikey=d1232874`;
    const response = await axios.get(url);
    const movies: MovieGetRequest[] = response.data;
    return movies;
  }

  async getMovieById(id: string) {
    const url = HOST + `?i=${id}&apikey=d1232874`;
    const response = await axios.get(url);
    const movies: MovieGetRequest = response.data;
    return movies;
  }

  async getMovieByNameS(name:string) {
    const url = HOST + `?s=${name}&apikey=d1232874`;
    const response = await axios.get(url);
    const movies: MovieGetSearch = response.data;
    return movies;
  }

  async getMovieByNamePage(name:string,page:number) {
    const url = HOST + `?s=${name}&page=${page}&apikey=d1232874`;
    const response = await axios.get(url);
    const movies: MovieGetSearch = response.data;
    return movies;
  }
 
}