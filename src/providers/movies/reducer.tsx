import { MovieActionEnum } from "./action";
import { IMovieStateContext } from "./context";

export function MovieReducer(
  incomingState: IMovieStateContext,
  action: ReduxActions.Action<IMovieStateContext>
): IMovieStateContext {
  const { type, payload } = action;

  switch (type) {
    case MovieActionEnum.CreateMovieRequest:
      return {
        ...incomingState,
        MovieGotten: [...incomingState.MovieGotten, payload.MovieCreated],
      };

    case MovieActionEnum.UpdateMovieRequest:
      const { MovieUpdated } = payload;
      const filteredMovies = [...incomingState?.MovieGotten].filter(
        ({ id }) => id != MovieUpdated?.id
      );
      return {
        ...incomingState,
        MovieGotten: [...filteredMovies, MovieUpdated],
      };

    case MovieActionEnum.GetMovieRequest:
      return { ...incomingState, ...payload };

    case MovieActionEnum.DeleteMovieRequest:
      const { DeletedMovieId } = payload;
      const filtered = [...incomingState?.MovieGotten].filter(
        ({ id }) => id != DeletedMovieId
      );
      return { ...incomingState, MovieGotten: [...filtered] };
    default:
      return incomingState;
  }
}
