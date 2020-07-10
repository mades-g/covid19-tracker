import React, { useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

export function Player({ videoId, height=300, width=400, style }) {
    const playerRef = useRef(null);
    const [playing] = useState(false);

    return(
        <YoutubePlayer
            ref={playerRef}
            height={height}
            width={width}
            videoId={videoId}
            play={playing}
            webViewStyle={style}
            volume={50}
            playbackRate={1}
            initialPlayerParams={{
                cc_lang_pref: "us",
                showClosedCaptions: true
            }}
        />
    )
}