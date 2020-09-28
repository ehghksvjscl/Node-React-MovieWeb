import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Button} from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    // server와 통신한 데이터는 무조건 state로 저장 해줘야 한다.
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // Json값
    let variables = {
        userFrom:userFrom,
        movieId:movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRunTime:movieRunTime
    }

    useEffect(() => {
        // 영화 좋아요 개수 가져오기 fetch
        Axios.post('/api/favorite/favoriteNumber',variables).then(response=> {
            if(response.data.success) {
                // 성공시 state관리
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert("숫자 정보를 가져오는데 실패 했습니다.")
            }
        })

        // 아이디의 좋아요 여부 가져오기 fetch
        Axios.post('/api/favorite/favorited',variables).then(response=> {
            // 성공시 state 관리
            setFavorited(response.data.favorited)
            if(response.data.success) {

            } else {
                alert("정보를 가져오는데 실패했습니다.")
            }
        })

    },[])

    // 좋아요 버튼 클릭 이벤트
    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite',variables).then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                } else {
                    alert("좋아요 취소 실패")
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite',variables).then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited)
                } else {
                    alert("좋아요 실패")
                }
            })
        }
    }


    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "좋아요 취소" : "좋아요"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
