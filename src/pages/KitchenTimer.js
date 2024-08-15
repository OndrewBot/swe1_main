import React, { useState, useEffect } from 'react';

function KitchenTimer() {
    const [inputHour, setHour] = useState('00');
    const [inputMinute, setMinute] = useState('00');
    const [inputSecond, setSecond] = useState('00');
    const [timerStatus, setTimerStatus] = useState({ remaining_time: 0, is_running: false });

    const getTime = () => {
        var hours = document.getElementById("hours").value;
        var minutes = document.getElementById("minutes").value;
        var seconds = document.getElementById("seconds").value;
        
        // Validate inputs
        if (!hours) hours = "00";
        if (!minutes) minutes = "00";
        if (!seconds) seconds = "00";

        if ((hours && /^\d+$/.test(hours)) &&
            (minutes && /^\d+$/.test(minutes)) &&
            (seconds && /^\d+$/.test(seconds))) {
            if ((Number(hours) >= 0 && Number(hours) <= 8) &&
                (Number(minutes) >= 0 && Number(minutes) <= 59) &&
                (Number(seconds) >= 0 && Number(seconds) <= 59)) {
                
                setHour(hours.padStart(2, '0'));
                setMinute(minutes.padStart(2, '0'));
                setSecond(seconds.padStart(2, '0'));

                // Start the timer on the backend
                startTimer(hours, minutes, seconds);
            } else {
                alert("Please enter a valid time.");
            }
        } else {
            alert("Please enter valid numbers.");
        }
    };

    const startTimer = async (hours, minutes, seconds) => {
        try {
            const response = await fetch('https://cs361-proj-timer.onrender.com/start-timer/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) }),
            });
            const data = await response.json();
            setTimerStatus({ remaining_time: data.duration, is_running: true });
        } catch (error) {
            console.error('Error starting timer:', error);
        }
    };

    const pauseTimer = async () => {
        try {
            const response = await fetch('https://cs361-proj-timer.onrender.com/pause-timer/', {
                method: 'POST',
            });
            const data = await response.json();
            setTimerStatus({ remaining_time: data.remaining_time, is_running: false });
        } catch (error) {
            console.error('Error pausing timer:', error);
        }
    };

    const resumeTimer = async () => {
        if (timerStatus.remaining_time > 0) {
            startTimer(0, 0, timerStatus.remaining_time);  // Resume with remaining time
        }
    };

    const resetTimer = async () => {
        try {
            const response = await fetch('https://cs361-proj-timer.onrender.com/reset-timer/', {
                method: 'POST',
            });
            const data = await response.json();
            setTimerStatus({ remaining_time: 0, is_running: false });
            setHour('00');
            setMinute('00');
            setSecond('00');
        } catch (error) {
            console.error('Error resetting timer:', error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch('https://cs361-proj-timer.onrender.com/status/');
            const data = await response.json();
            
            if (data.remaining_time >= 0) {
                // Calculate hours, minutes, and seconds
                const hours = Math.floor(data.remaining_time / 3600);
                const minutes = Math.floor((data.remaining_time % 3600) / 60);
                const seconds = Math.floor(data.remaining_time % 60);
    
                // Update the timer display
                setHour(hours.toString().padStart(2, '0'));
                setMinute(minutes.toString().padStart(2, '0'));
                setSecond(seconds.toString().padStart(2, '0'));
            }
    
            // Update the timer status
            setTimerStatus(data);
    
        } catch (error) {
            console.error('Error fetching timer status:', error);
        }
    };    

    useEffect(() => {
        if (timerStatus.is_running) {
            const interval = setInterval(() => {
                fetchStatus();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timerStatus.is_running]);

    useEffect(() => {
        if (timerStatus.remaining_time <= 0 && timerStatus.is_running) {
            setTimerStatus({ ...timerStatus, is_running: false });
    
            clearInterval();
    
            alert("Time's up!");
    
            resetTimer();
        }
    }, [timerStatus.remaining_time, timerStatus.is_running]);

    useEffect(() => {
        // Fetch the timer status when the component mounts
        const fetchTimerStatus = async () => {
            try {
                const response = await fetch('https://cs361-proj-timer.onrender.com/status/');
                const data = await response.json();
                setTimerStatus(data);

                // Update the display time
                const hours = Math.floor(data.remaining_time / 3600);
                const minutes = Math.floor((data.remaining_time % 3600) / 60);
                const seconds = Math.floor(data.remaining_time % 60);

                setHour(hours.toString().padStart(2, '0'));
                setMinute(minutes.toString().padStart(2, '0'));
                setSecond(seconds.toString().padStart(2, '0'));
                
            } catch (error) {
                console.error('Error fetching timer status:', error);
            }
        };

        fetchTimerStatus();
    }, []);

    return (
        <>
            <h1 className="display-5">Kitchen Timer</h1>
            <p className="lead">Set your time using the inputs below.</p>
            <p className="lead">Then click START! You'll be able to PAUSE and RESET if needed.</p>
            <div>
                <div className="card d-inline-flex align-items-center" style={{ width: 25 + 'em' }}>
                    <div className="card-body" style={{ width: 90 + '%' }}>
                        <h5 className="card-title">New Timer</h5>
                        <div className="mb-3 row">
                            <label htmlFor="hours" className="col-sm-2 col-form-label" style={{ width: 25 + '%' }}>Hours</label>
                            <div className="col-sm-10" style={{ width: 60 + '%' }}>
                                <input className="form-control form-control-sm" type="number" placeholder="LESS THAN 9" aria-label=".form-control-sm example" id="hours" inputMode="numeric" pattern="\d*" min="0" max="8" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="minutes" className="col-sm-2 col-form-label" style={{ width: 25 + '%' }}>Minutes</label>
                            <div className="col-sm-10" style={{ width: 60 + '%' }}>
                                <input className="form-control form-control-sm" type="number" placeholder="LESS THAN 60" aria-label=".form-control-sm example" id="minutes" inputMode="numeric" pattern="\d*" min="0" max="59" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="seconds" className="col-sm-2 col-form-label" style={{ width: 25 + '%' }}>Seconds</label>
                            <div className="col-sm-10" style={{ width: 60 + '%' }}>
                                <input className="form-control form-control-sm" type="number" placeholder="LESS THAN 60" aria-label=".form-control-sm example" id="seconds" inputMode="numeric" pattern="\d*" min="0" max="59" />
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-success" onClick={getTime}>START</button>
                        </div>
                    </div>
                    <div className="card d-inline-flex align-items-center" style={{ width: 25 + 'em' }}>
                        <div className="card-body" style={{ width: 90 + '%' }}>
                            <h1 className="card-title">{inputHour}:{inputMinute}:{inputSecond}</h1>
                            <div id="errorText" className="error"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-warning" onClick={pauseTimer}>PAUSE</button>
                    <button type="button" className="btn btn-success" onClick={resumeTimer}>RESUME</button>
                    <button type="button" className="btn btn-danger" onClick={resetTimer}>RESET</button>
                </div>
            </div>
        </>
    )
}

export default KitchenTimer;
