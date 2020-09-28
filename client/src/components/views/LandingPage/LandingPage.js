import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from "./Sections/MainImage"
import GridCards from "../commons/GridCards"

import {Row} from 'antd'

function LandingPage() {

    // 데이터 관리하기
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    // 데이터 가져오기
    useEffect( () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`
        fetchMovies(endpoint)
    }, [])

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${CurrentPage+1}`
        fetchMovies(endpoint)
    }

    const fetchMovies = (endpoint) => {
        fetch(endpoint).then(response => response.json())
        .then(response => {
            // 데이터 할당 ... 없으면 안나옴 이래가 안감..
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    return (
        <div style={{width: "100%", margin: "0"}}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}/w1280${MainMovieImage.backdrop_path}`} 
                           title={MainMovieImage.original_title}
                           text={MainMovieImage.overview}
                />
            }
            <div style={{ width:"85%", margin: "20px auto"}}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16,16]}>
                {Movies && Movies.map((movie,index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            landingPage 
                            image={movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}    
                        />
                    </React.Fragment>
                ))} 
                </Row>
                {/* <Row>
                    {Movies && Movies.map(function(movie, index){
                        console.log(`movie->>>${movie.poster_path}, ${index}`);
                    })} 
                </Row> */}
            </div>

            <div style={{display:"flex", justifyContent:"center"}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
