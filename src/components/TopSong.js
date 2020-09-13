import React, {useEffect} from 'react';

const TopSong = (props) => {

    return(<>
        <div className='individual-song-container'>
            <div className='song-img'><img alt='album artwork' className='img' src={props.songData.album.images[1].url} /></div>
            <div className='song-info'>
                <div className='title'>
                    <p>{props.songData.name}</p>
                </div>
                <div className='artist'>
                    <p>{props.songData.artists[0].name}</p>
                </div>
                <div className='functionality'>
                    <div className='similar'>Similar</div>
                    <div className='features'>Features</div>
                </div>
            </div>
        </div>
    </>)

}

export default TopSong;