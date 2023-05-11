// import { MovieActionEnum } from "./action";
// import { IMovie, IMovieStateContext } from "./context";

// export function MovieReducer(incomingState: IMovieStateContext, action: ReduxActions.Action<IMovieStateContext>): IMovieStateContext {

//     const { type, payload } = action;

//     switch (type) {
//         case MovieActionEnum.CreateMovieRequest:
//             return { ...incomingState, fetchedMovie:[...incomingState?.fetchedMovie, payload.CreateMovie]};
//         case MovieActionEnum.UpdateMovieRequest:
//             const {UpdateMovie}=payload;
//             const filteredMovies=[...incomingState?.fetchedMovie].filter(({id})=>id!=UpdateMovie?.id)
//             return { ...incomingState, fetchedMovie:[...filteredMovies, UpdateMovie]};

//         case MovieActionEnum.getMovieDetailsRequest:   
//           return {...incomingState,...payload}     
//         case MovieActionEnum.DeleteMovieRequest:
//             const {deletedMovie}=payload;
//             const filtered=[...incomingState?.fetchedMovie].filter(({id})=>id!=deletedMovie)
//             return { ...incomingState, fetchedMovie:[...filtered]};
//              default:
//         return incomingState;
//     }
// }