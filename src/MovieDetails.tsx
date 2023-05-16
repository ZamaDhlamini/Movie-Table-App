import * as React from "react";
import { Button, Modal } from 'antd';
import { useState } from "react";


// interface IMovieData {
//   id: number;
//   title: string;
//   duration: number;
//   category: string;
//   starring: string;
//   release_date: string;
// }

// interface MovieDetailsProps {
//   movie: IMovieData;
// }

// const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <p>Duration: {movie.duration} minutes</p>
//       <p>Category: {movie.category}</p>
//       <p>Starring: {movie.starring}</p>
//     </div>
//   );
// };

interface IMovieData {
  id: number;
  title: string;
  duration: number;
  category: string;
  starring: string;
  release_date: string;
}

interface Props {
  movie: IMovieData;
  visible: boolean;
  onClose: () => void;
}

const MovieDetails: React.FC<Props> = ({ movie, visible, onClose }) => {
  return (
    <Modal
      title={movie.title}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>
        <strong>Title: </strong> {movie.title}
      </p>
      <p>
        <strong>Duration: </strong> {movie.duration}
      </p>
      <p>
        <strong>Category: </strong> {movie.category}
      </p>
      <p>
        <strong>Starring: </strong> {movie.starring}
      </p>
    </Modal>
  );
};

export default MovieDetails;
