import React, { FC, useState, useRef, useCallback } from 'react';
import useVideoRecordingPageStyles from './VideoRecordingPageStyles';
import Webcam from "react-webcam";
import Axios from 'axios';
import { Button } from '@material-ui/core';

export type Props = {}

const VideoRecordingPage: FC<Props> = (props) => {
    const classes = useVideoRecordingPageStyles();

    const webcamRef = useRef<any>();
    const mediaRecorderRef = useRef<any>();
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);

        mediaRecorderRef.current = new MediaRecorder(
            webcamRef.current.stream, {
            mimeType: "video/webm"
        });

        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );

        mediaRecorderRef.current.start();

    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleUpload = useCallback(async () => {
        if (recordedChunks.length) {
            const chunks = recordedChunks;
            setRecordedChunks([]);

            const blob = new Blob(chunks, { type: "video/webm" });

            var formData = new FormData();
            formData.append('video', blob);

            await Axios.post("https://localhost:44324/api/videos", formData);
        }
    }, [recordedChunks]);

    function isUploadDisabled() {
        if (capturing) {
            return true;
        }

        if (recordedChunks.length > 0) {
            return false;
        }

        return true;
    }

    return (
        <div className={classes.root}>
            <Webcam audio={false} ref={webcamRef} />
            <div className={classes.actionSection}>
                <Button variant="contained" disabled={capturing} onClick={handleStartCaptureClick}>Start Capture</Button>
                <Button variant="contained" disabled={!capturing} onClick={handleStopCaptureClick}>Stop Capture</Button>
                <Button variant="contained" disabled={isUploadDisabled()} onClick={handleUpload}>Upload</Button>
            </div>
        </div>
    );
};

export default VideoRecordingPage;