import { React, useState } from 'react';
import { Link } from 'react-router-dom';


function KitchenTimer(){
    const [inputHour, setHour] = useState('00');
    const [inputMinute, setMinute] = useState('00');
    const [inputSecond, setSecond] = useState('00');

    const getTime = () => {
        var hours= document.getElementById("hours").value;
        var minutes = document.getElementById("minutes").value;
        var seconds = document.getElementById("seconds").value;
        if (!hours) {
            hours = "00"
        }
        if (!minutes) {
            minutes = "00"
        }
        if (!seconds) {
            seconds = "00"
        }
        // Check if the input is an integer
        if ((hours && /^\d+$/.test(hours)) &&
            (minutes && /^\d+$/.test(minutes)) &&
            (seconds && /^\d+$/.test(seconds))) {
            if ((Number(hours) >= 0 && Number(hours) <= 8) &&
                (Number(minutes) >= 0 && Number(minutes) <= 59) &&
                (Number(seconds) >= 0 && Number(seconds) <= 59)) {
                setHour('0' + hours);
                if (Number(minutes) < 10 && Number(minutes) < 0) {
                    setMinute('0'+minutes)
                } else {
                    setMinute(minutes);
                }
                if (Number(minutes) < 10) {
                    setSecond('0'+seconds);
                } else {
                    setSecond(seconds);
                }
            } else {
                alert("Please enter a number between 0 and 59.");
            }
        } else {
            alert("Please enter a valid number.");
        }
    };

    return (
        <>
            <h1 class="display-5">Kitchen Timer</h1>
            <p class="lead">Set your time using the inputs below.</p>
            <p class="lead">Then click START! You'll be able to PAUSE and RESET if needed.</p>
            <div>
                <div class="card d-inline-flex align-items-center" style={{width: 25 + 'em'}}>
                    <div class="card-body" style={{width: 90 + '%'}}>
                        <h5 class="card-title">New Timer</h5>
                        <div class="mb-3 row">
                            <label for="hours" class="col-sm-2 col-form-label" style={{width: 25 + '%'}}>Hours</label>
                            <div class="col-sm-10" style={{width: 60 + '%'}}>
                                <input class="form-control form-control-sm" type="number" placeholder="LESS THAN 9" aria-label=".form-control-sm example" id="hours" inputMode="numeric" pattern="\d*" min="0" max="59"/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="minutes" class="col-sm-2 col-form-label" style={{width: 25 + '%'}}>Minutes</label>
                            <div class="col-sm-10" style={{width: 60 + '%'}}>
                                <input class="form-control form-control-sm" type="number" placeholder="LESS THAN 60" aria-label=".form-control-sm example" id="minutes" inputMode="numeric" pattern="\d*" min="0" max="59"/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="seconds" class="col-sm-2 col-form-label" style={{width: 25 + '%'}}>Seconds</label>
                            <div class="col-sm-10" style={{width: 60 + '%'}}>
                                <input class="form-control form-control-sm" type="number" placeholder="LESS THAN 60" aria-label=".form-control-sm example" id="seconds" inputMode="numeric" pattern="\d*" min="0" max="59"/>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-success" 
                            onClick={getTime}>START</button>
                        </div>
                    </div>
                    <div class="card d-inline-flex align-items-center" style={{width: 25 + 'em'}}>
                        <div class="card-body" style={{width: 90 + '%'}}>
                            <h1 class="card-title">{inputHour}:{inputMinute}:{inputSecond}</h1>
                            <div id="errorText" class="error"></div>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <button type="button" class="btn btn-warning" data-bs-toggle="button"
                    data-bs-target="btnRestart">PAUSE</button>
                    <button type="button" class="btn btn-success">RESUME</button>
                    <button type="button" class="btn btn-danger">RESTART</button>
                </div>   
            </div>
        </>
    )
}

export default KitchenTimer;