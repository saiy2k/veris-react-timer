import { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';

/**
 * Design Reference: https://www.behance.net/gallery/95912877/Daily-UI-Day-14-Timer
 */
function App() {
    console.log('App load');
    const [mins, setMins] = useState(3);
    const [secs, setSecs] = useState(180);
    const [running, setRunning] = useState(false);
    const [timerId, setTimerId] = useState(0);
    const [center, setCenter] = useState({x: 0, y: 0});
    const svgRef = useRef();
    const circleRef = useRef();

    useEffect(() => {
        if (secs === 0) {
            setRunning(false);
            circleRef.current.style.animation= '';
            return;
        }

        if (running) {
            const tid = setTimeout(() => {
                setSecs(secs - 1);
            }, 1000);
            setTimerId(tid);
        }
    }, [secs, running]);

    const onStart = () => {
        circleRef.current.style.animation= '';
        circleRef.current.style.animationPlayState = 'running';

        clearTimeout(timerId);
        setSecs(mins * 60);
        setRunning(true);

        setTimeout(() => {
            circleRef.current.style.animation= `rotate ${mins * 60}s linear infinite`;
        }, 1);
    }

    const onStop = () => {
        circleRef.current.style.animation= '';
        circleRef.current.style.animationPlayState = 'running';

        clearTimeout(timerId);
        setSecs(mins * 60);
        setRunning(false);
    }

    const onPause = () => {

        if (running) {
            setRunning(false);
            circleRef.current.style.animationPlayState = 'paused';
        } else {
            setRunning(true);
            circleRef.current.style.animationPlayState = 'running';
        }
    }

    useEffect(() => {
        const width = svgRef?.current.clientWidth;
        setCenter({x: width * 0.5, y: width * 0.5});
    }, []);

    const radius = 150;

    return (
        <div className="App">
            <div className='pt-5 input-row'>
                <input type='number' value={mins} onChange={(e) => setMins(e.target.value) } />
                <button onClick={(_e) => onStart()}> Start </button>
                <button onClick={(_e) => onStop()}> Stop </button>
            </div>
            <div className='svgContainer'>
                <svg className='svgElm' ref={svgRef}>
                    <circle cx={center.x} cy={center.y} r={radius} className='outline' />
                    <circle cx={center.x} cy={center.y} r={radius} className='outlineAnim' ref={circleRef} />
                </svg>
                <div className='timer-label'> { getMins(secs) } : { getSecs(secs) }</div>
            </div>
            <div className='pt-5'>
                <button className='round-button' onClick={ (_e) => onPause() }> { running ? 'Pause' : 'Continue' } </button>
                <button className='round-button' onClick={ (_e) => onStart() }> Reset </button>
            </div>
            <img src={logo} className='logo' />
        </div>
    );
}

function getMins(secs) {
    const min = Math.floor(secs / 60);
    return min < 10 ? '0' + min : min.toString();
}

function getSecs(secs) {
    const sec = secs % 60;
    return sec < 10 ? '0' + sec : sec.toString();
}

export default App;
