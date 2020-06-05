import React, { FC, useEffect, useState } from 'react';
import useVideosPageStyles from './VideosPageStyles';
import Axios from 'axios';
import VideoPlayer from '../../component/VideoPlayer/VideoPlayer';
import { VideoJsPlayerOptions } from 'video.js';

const VideosPage: FC = () => {
    const classes = useVideosPageStyles();
    const [videoIds, setVideoIds] = useState<Array<string>>();

    // Get a list of video ids
    useEffect(() => {
        if (!videoIds) {
            Axios.get<Array<string>>("https://localhost:44324/api/videos")
                .then((ids) => setVideoIds(ids.data));
        }
    });

    function getOptions(id: string): VideoJsPlayerOptions {
        return {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            width: 720,
            height: 300,
            controls: true,
            sources: [
                {
                    src: `https://localhost:44324/api/videos/${id}`,
                    type: 'video/mp4'
                }
            ]
        }
    }

    function getVideoPlayers() {
        if (videoIds) {
            return videoIds.map(id => <VideoPlayer key={id} {...getOptions(id)} />);
        }
    }

    return (
        <div>
            {getVideoPlayers()}
        </div>
    );
};

export default VideosPage;