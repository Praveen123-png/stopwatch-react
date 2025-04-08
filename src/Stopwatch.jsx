import { useState, useEffect, useRef } from "react";

function Stopwatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        }

    }, [isRunning] );

    function start(){
        setIsRunning(true);
        startTimeRef.current = (Date.now() - elapsedTime);
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setIsRunning(false);
        setElapsedTime(0)
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = hours.toString().padStart(2, 0);
        minutes = minutes.toString().padStart(2, 0);
        seconds = seconds.toString().padStart(2, 0);
        milliseconds = milliseconds.toString().padStart(2, 0);

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }

    return (<>
        <div className="container">

            <h2 className="display">{formatTime()}</h2>
            <button className="startBtn" onClick={start}>Start</button>
            <button className="stopBtn" onClick={stop}>Stop</button>
            <button className="resetBtn" onClick={reset}>Reset</button>

        </div>

    </>)

}

export default Stopwatch