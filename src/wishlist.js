import React, { useEffect, useState } from 'react';

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const userID = window.localStorage.getItem("savedID");

  useEffect(() => {
    // 로그인된 사용자 ID별로 위시리스트 가져오기
    const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    setWishlist(storedWishlist);
  }, [userID]);
  

  const removeWishlist = (movieId)=>{
    // 해당 영화만 제거된 리스트 새로 생성
    const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${userID}`, JSON.stringify(updatedWishlist));
  }


  return (
       <div className='movie-list'>
         <h2>Your Wishlist</h2>
         {wishlist.length > 0 ? (
           wishlist.map(movie => (
             <div key={movie.id}>
               <h3>{movie.title}</h3>
               <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
               <button onClick={() => removeWishlist(movie.id)}>
                   remove movie
               </button>
             </div>
           ))
         ) : (
           <p>No movies</p>
         )}
     </div>
  );
}

export default WishList;
