import React, { useEffect, useState } from 'react'

function YouTube() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getWatchList = async () => { 
      const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.REACT_APP_YOUTUBE_PLAYLIST_ID}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
      const data = await res.json();
      setVideos(data.items);
    }
    
    getWatchList();
  }, [])


  console.log(videos);
  

  return (
    <div className='bg-gray-900 p-4 mx-4 mt-3 rounded-xl'>
      <h1 className='text-gray-100 text-xl'>YouTube WatchLater</h1>
      <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {videos.map((video: any) => (
  <div key={video.snippet.resourceId.videoId} className="bg-gray-700 rounded-lg shadow-md overflow-hidden">
    <div className="w-full relative">
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-auto" />
      <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} 
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 rounded-full p-2">
        <svg className="w-10 h-10 text-gray-100" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M14.752 11.168l-6.504 3.75A1 1 0 0 1 7 13.75v-7.5a1 1 0 0 1 1.248-.92l6.504 3.75a1 1 0 0 1 0 1.788z"/>
        </svg>
      </a>
    </div>
    <div className="p-4">
      <p className="text-sm font-semibold overflow-hidden text-gray-100 whitespace-nowrap text-overflow-ellipsis">{video.snippet.title}</p>
    </div>
  </div>
))}

      </div>
    </div>
    
  )
}

export default YouTube;