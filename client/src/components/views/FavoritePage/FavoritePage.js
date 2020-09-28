import Axios from 'axios'
import React, {useEffect,useState} from 'react'
import './FavoritePage.css'
import { IMAGE_BASE_URL } from '../../Config'

import {Button,Popover} from "antd"

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie',{userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("영화 정보를 가져오는데 실패 했습니다.")
            }
        })
    }

    const onClickDelete = (movieId,userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite',variables).then(response => {
            console.log(response)
            if(response.data.success) {
                fetchFavoredMovie()
            } else {
                alert("좋아요 영화 삭제 실패")
            }
        })
    }

    const renderCards =  Favorites.map((favorite,index) => {
        const content = (
            <div>
                {favorite.moviePost ? <img src={`${IMAGE_BASE_URL}/w500${favorite.moviePost}`}/> : "No Image"}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={favorite.movieTitle}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} 분</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId,favorite.userFrom)}>제거</Button></td>
        </tr>
    })

    return (
        <div style={{width:"85%", margin:"3rem auto"}}>
            <h2>Favorite Movies</h2>
            <table>
                <thead>
                    <tr>
                        <th>영화 제목</th>
                        <th>영화 시간</th>
                        <td>제거 버튼</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
