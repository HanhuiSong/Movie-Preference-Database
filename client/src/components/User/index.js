import {useState, useEffect} from "react";
import './styles.css';
import Carousel from "./Carousel";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

// const getPlayList = async () => {
//     for (let movieId of user.playList) {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/movies?where={"id": "${movieId}"}`);
//             movies.push(...response.data.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
// getPlayList();

// let reviews = [];
// const getReviews = async () => {
//     for (let id of user.reviews) {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/reviews?where={"id": "${id}"}`);
//             reviews.push(...response.data.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
// getReviews();

const getPosterURL = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`
}

const numbers = Array.from(Array(10).keys())

function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/users?where={"username": "${username}"}`)
            .then((response) => {
                setUser(response.data.data[0]);
                setWatchlist((response.data.data[0].playList));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let movies = [];

    const getMovies = async () => {
        for (let movieId of watchlist) {
            try {
                const response = await axios.get(`http://localhost:4000/api/movies?where={"id": "${movieId}"}&limit=1`);
                movies.push(...response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="User">
            <div className="User-info">
                <h1>{user.username}</h1>
                Email: {user.email}
            </div>
            <div className="User-playlist">
                <h2>Watchlist</h2>
                <div className="User-movies">
                    <Carousel show={8}>
                        {movies.map((movie) => (
                            <Link to={"/detail/" + movie.id}>
                                <div className="User-poster-wrapper" key={movie.title}>
                                    <img className="User-poster" src={getPosterURL(movie.poster_path)} alt="poster"/>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="User-reviews">
                <h2>Reviews</h2>
                <div className="User-reviewList">
                    {/*{this.state.reviews.map((review) => (*/}
                    {/*    <div className="User-reviewItem">*/}
                    {/*        <div className="User-reviewMovie">*/}
                    {/*            <Link to={"/detail/" + review.movieID}>*/}
                    {/*                <img src={getPosterURL(review.poster_path)} alt={review.title}/>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*        <div className="User-reviewBody">*/}
                    {/*            <div className="User-reviewHeader">*/}
                    {/*                <div className="User-reviewTitle">*/}
                    {/*                    Title: {review.title}*/}
                    {/*                </div>*/}
                    {/*                <div className="User-reviewDate">*/}
                    {/*                    {review.dateCreated}*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="User-reviewContent">*/}
                    {/*                {review.content}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    <div className="User-reviewItem">
                        <div className="User-reviewMovie">
                            <img className="User-poster" src={getPosterURL("/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg")} alt="poster"/>
                        </div>
                        <div className="User-reviewBody">
                            <div className="User-reviewHeader">
                                <div className="User-reviewTitle">
                                    Title: Test
                                </div>
                                <div className="User-reviewDate">
                                    01-01-2022
                                </div>
                            </div>
                            <div className="User-reviewContent">
                                Review Content Here!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
