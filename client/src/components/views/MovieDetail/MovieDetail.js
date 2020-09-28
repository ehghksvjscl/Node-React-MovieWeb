import React, { useEffect,useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards"
import Favorite from "./Sections/Favorite";

import {Row,Button} from 'antd'


function MovieDetail(props) {

    // 데이터 가져오기(파람 스트리밍 방식)
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    // 디테일 데이터 가져오기
    useEffect(()=> {
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        fetch(endpointInfo).then(response => response.json()).then(response => {
            setMovie(response)
        })

        fetch(endpointCrew).then(response => response.json()).then(response => {
            setCasts(response.cast)
        })

    },[])

    // onClick Event Function Definition
    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            {Movie.backdrop_path &&
                <MainImage image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`} 
                           title={Movie.original_title}
                           text={Movie.overview}
                />
            }
            {/* Body */}
            <div style={{ width:"85%", margin:"1rem auto"}}>

                {/* Favorite Button */}
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>
                <br/>


                <div style={{display:"flex", justifyContent:"center",margin:"2rem"}}>
                    <Button onClick={toggleActorView}> Toggle Actor View</Button>
                </div>

                {/* Actros Grid */}
                {ActorToggle && 
                    <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast,index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ? `${IMAGE_BASE_URL}/w500${cast.profile_path}` : null}
                                characterName={cast.name}    
                            />
                        </React.Fragment>
                    ))} 
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail