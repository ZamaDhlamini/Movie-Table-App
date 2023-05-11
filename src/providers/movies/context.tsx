import { createContext } from "react";

export interface IMovie{
    id?: string
    title: string
    duration: string
    description: string
    staring: string
    category: string
}

export interface IMovieStateContext{
    readonly MovieCreated?: IMovie
    readonly MovieGotten?: IMovie[]
    readonly MovieUpdated?: IMovie
    readonly MovieDeleted?: IMovie

}

export const INITIAL_STATE: IMovieStateContext = {}

export interface IMovieActionContext{
    createMovie?:(payload:IMovie)=> void;
    getMovie?:(payload:IMovie)=> void;
    updateMovie?:(payload:IMovie)=> void;
    deleteMovie?:(payload:IMovie)=> void;

}

export const MovieContext = createContext<IMovieStateContext>(INITIAL_STATE);
const MovieActionContext = createContext<IMovieActionContext>({});