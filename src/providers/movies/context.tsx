import { createContext } from "react";

export interface IMovie {
  id?: string;
  title?: string;
  duration?: string;
  description?: string;
  staring?: string;
  category?: string;
}

export interface IMovieStateContext {
  readonly MovieCreated?: IMovie;
  readonly DeletedMovieId?: string;
  readonly MovieGotten?: IMovie[];
  readonly MovieUpdated?: IMovie;
  readonly MovieDeleted?: IMovie;
}

export interface IMovieActionContext {
  createMovie: (payload: IMovie) => Promise<void>;
  getMovie: () => void;
  updateMovie: (payload: IMovie) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
}

export interface IMovieContext extends IMovieStateContext, IMovieActionContext {}

export const INITIAL_STATE: IMovieStateContext = {
  MovieCreated: {},
  MovieGotten: []
};

const MovieStateContext = createContext<IMovieStateContext>(INITIAL_STATE);
const MovieActionContext = createContext<IMovieActionContext>(undefined);

export { MovieStateContext, MovieActionContext };
