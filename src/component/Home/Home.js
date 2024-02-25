import { useEffect, useState } from "react";
import MovieList from '../MovieList/MovieList';

function Home() {
    const [movieArr, setMovieArr] = useState([]);

    const sendReq = async () => {
        const serverURL = `http://localhost:3013/trending`;
        const res = await fetch(serverURL);
        console.log(res)
        const jsonRes = await res.json();
        console.log(jsonRes);
        setMovieArr(jsonRes);
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <>
            <MovieList movieArr={movieArr} />
        </>
    );
}

export default Home;