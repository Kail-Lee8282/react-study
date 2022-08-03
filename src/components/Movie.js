import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

Movie.propTypes = {
    id:PropTypes.number.isRequired,
    coverImg:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    genres:PropTypes.arrayOf(PropTypes.string).isRequired,
    rating:PropTypes.number,
}

function Movie({ id, title, rating, genres, coverImg, summary }) {
  return (
    <div>
      <Link to={`./movie/${id}`}>{title} ({rating})</Link>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <div>
        <img src={coverImg} alt={title} />
      </div>
      <p>{summary}</p>
    </div>
  );
}

export default Movie;
