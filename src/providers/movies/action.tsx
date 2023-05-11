import { IMovie, IMovieStateContext } from "./context";
import { createAction } from "redux-actions";

export enum MovieActionEnum{
    CreateMovieRequest = 'Create',
    GetMovieRequest = 'Get',
    UpdateMovieRequest = 'Updated',
    DeleteMovieRequest = 'Delete'
}

export const CreateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.CreateMovieRequest, (MovieCreated) => ({MovieCreated}));
// export const GetMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.GetMovieRequest, (MovieGotten) => ({MovieGotten}));
export const UpdateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.UpdateMovieRequest, (MovieUpdated) => ({MovieUpdated}));
export const DeleteMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.DeleteMovieRequest, (MovieDeleted) => ({MovieDeleted: MovieDeleted}));