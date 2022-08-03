import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const getMovie = async()=>{
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);
        
    }

    useEffect(() => {
    //   const json = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    //     .then((res) => res.json())
    //     .then((movie) => console.log(movie.data.movie))
    //     .catch((err) => console.log("Err", err));
        getMovie();
    }, []);

  return (
    <div>
      <h1>Detail</h1>
      {loading? <h3>Loading...</h3> : <Movie
                id={movie.id}
                key={movie.id}
                title={movie.title}
                rating={movie.rating}
                genres={movie.genres}
                coverImg={movie.medium_cover_image}
                summary={movie.description_full}
              />}
    </div>
  );
}

export default Detail;
