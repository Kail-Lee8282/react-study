import {useEffect, useState} from 'react';
import Movie from '../components/Movie';

function Home(){
    const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(()=>{
    // fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")
    // .then((res)=>res.json())
    // .then((movies)=>{
    //   console.log(movies.data.movies);
    //   setMovies(movies.data.movies);
    // })
    // .catch((err)=>console.log("err",err));
    getMovies();
  },[]);

  console.log(movies);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Movie
                id={movie.id}
                key={movie.id}
                title={movie.title}
                rating={movie.rating}
                genres={movie.genres}
                coverImg={movie.medium_cover_image}
                summary={movie.summary}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;