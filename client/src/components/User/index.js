import {Component} from "react";
import './styles.css';
// import axios from "axios";
// import {Link, useSearchParams} from "react-router-dom";

// const [searchParams] = useSearchParams();
// const username = searchParams.get("username");

// let user;
// const getUser = async () => {
//     try {
//         const response = await axios.get(`http://localhost:4000/api/users?where={"username": "${username}"}`);
//         user = response.data.data;
//     } catch (error) {
//         console.log(error)
//     }
// }
// getUser();

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

const numbers = Array.from(Array(100).keys())

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: user,
            // movies: movies,
            // reviews: reviews
        }
    }

    render() {
        return (
            <div className="User">
                <div className="User-info">
                    {/*<h1>{this.state.user.username}</h1>*/}
                    <h1>Username</h1>
                    {/*Email: {this.state.user.email}*/}
                    Email: test@test.test
                </div>
                <div className="User-playlist">
                    <h2>Watchlist</h2>
                    <div className="User-movies">
                        {/*{this.state.movies.map((movie) => (*/}
                        {/*    <div className="User-playListItem" key={movie.title}>*/}
                        {/*        <Link to={"/detail/" + movie.id}>*/}
                        {/*            <img src={getPosterURL(movie.poster_path)} alt={movie.title}/>*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        {numbers.map((number) => (
                            <img className="User-poster" src={getPosterURL("/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg")} alt="poster"/>
                        ))}
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
}

export default User
