import React, { FC, useEffect, useState } from 'react';
import videojs, { VideoJsPlayerOptions } from 'video.js';

const VideoPlayer: FC<VideoJsPlayerOptions> = (props) => {
    const [player, setPlayer] = useState<any>();
    const [videoNode, setVideoNode] = useState<any>();

    useEffect(() => {
        if (!player && videoNode && props) {
            const player = videojs(videoNode, props, function onPlayerReady() {
                console.log('onPlayerReady');
            });

            setPlayer(player);      
        }

        return () => {
            if (player) {
                player.dispose();
            }
        }
    }, [player, videoNode, props]);

    return (
        <div data-vjs-player>
            <video ref={node => (setVideoNode(node))} className="video-js" />
        </div>
    );
}

export default VideoPlayer;