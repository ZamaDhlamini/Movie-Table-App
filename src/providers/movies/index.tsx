// import React, { PropsWithChildren, useReducer, useContext, FC,useState } from 'react';
// import { MovieReducer } from './reducer';
// import { IMovie, INITIAL_STATE, MovieContext } from './context';
// import { CreateMovieRequestAction,GetMovieRequestAction,UpdateMovieRequestAction, DeleteMovieRequestAction  } from './action';

// const MovieProvider: FC<PropsWithChildren> = ({ children }) => {

//     const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE)
//     const [movies, setMovies] = useState<IMovie[]>([]);

//     const createMovie = async (payload: IMovie) => {
//         await fetch('https://localhost:44311/api/services/app/Movie/Create', {
//             method: 'POST',
//             cache: "no-cache",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         }).then(res => {
//             res.json().then(data => {
//                 dispatch(CreateMovieRequestAction(data.result))
//                 //  window.location.href='/table'
//             })
//         })

//     }
//     const getMovie = async () => {
//         await fetch('https://localhost:44311/api/services/app/Movie/GetAll', {
//             method: 'GET',
//             cache: "no-cache",
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         }).then(res => {
//             res.json().then(data => {
//                 dispatch(GetMovieRequestAction(data.result.items));
//                      console.log('get data::',data.result.items)
//              })
//         })
        
//     }
    
//     const updateMovie = async (payload: IMovie) => {
//         await fetch(`https://localhost:44311/api/services/app/Movie/Update?id=${payload.id}`, {
//             method: 'PUT',
//             cache: "no-cache",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         }).then(res => {
//             res.json().then(data => {
//                 dispatch(UpdateMovieRequestAction(data.request))
//                 window.location.href='/table'
//             })
//         })
//     }
    
//     const deleteMovie = async (payload: string): Promise<void> => {
//         await fetch(`https://localhost:44311/api/services/app/Movie/Delete?id=${payload}`, {
//             method: 'DELETE'
//         }).then(res => {
//             res.json().then(data => {
//                 dispatch(DeleteMovieRequestAction(payload))
//                 window.location.href='/table'
//             })
//         })
//     }

//     return (
//         <MovieContext.Provider value={state}>
//             <MovieContext.Provider value={{createMovie,getMovie,updateMovie, deleteMovie }}>      
//                 {children}
//             </MovieContext.Provider>
//         </MovieContext.Provider>

//     )
// }

// function useMovieState() {
//     const context = useContext(MovieContext);
//     if (!context) {
//         throw new Error(`useState must be used within an AuthProvider`)
//     }
//     return context;
// }

// function useMovieActionState() {
//     const context = useContext(MovieActionContext);
//     if (!context) {
//         throw new Error(`useMovieActions must be used within an AuthProvider`)
//     }
//     return context;
// }

// function useMovies() {
//     return {
//         ...useMovieState(),
//         ...useMovieActionState(),
//     }
// }

// export { useMovies, MovieProvider }