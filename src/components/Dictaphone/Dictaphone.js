import React, {useEffect,useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import styles from './Dictaphone.module.css';
import spinner from '../../images/spinner.svg';
import microphone from '../../images/microphone.svg'
const Dictaphone = (props) => {
    
    const {transcript, listening, resetTranscript} = useSpeechRecognition()
    useEffect(()=>{
        props.transcriptHandler(transcript);
        
    },[transcript])
    if (!SpeechRecognition.browserSupportsSpeechRecognition){
        return null
    }
    console.log(listening)
    return (
        <div className={styles.container}>
            <div className={styles.start_spinner}>
                <img className={styles.start} src={microphone} alt='microphone' onClick={SpeechRecognition.startListening}/>
                {listening ?
                <img className={styles.spinner} src={spinner} alt='spinner'/>
                : <p className={styles.emptytext}></p>
                }
            </div>
            <p>{transcript}</p>
            {/* <button className={styles.stop} onClick={SpeechRecognition.stopListening}>Stop</button> */}
            <button className={styles.reset} onClick={resetTranscript}>Clear</button>
            
        </div> 
    )
    
}
export default Dictaphone;