import { makeStyles } from '@material-ui/styles';

const useVideoRecordingPageStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        '& > *': {
            marginTop: 10,
            marginBottom: 10
        }
    },
    actionSection: {
        display: "flex",
        justifyContent: "center",
        '& > button' : {
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: "#2d2d2d",
            fontSize: 17,
            color: "white"
        }
    }
}));

export default useVideoRecordingPageStyles;