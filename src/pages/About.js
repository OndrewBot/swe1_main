import React from 'react';
import { Link } from 'react-router-dom';


function About(){
    return (
        <>
            <div class="card d-inline-flex text-start" style={{width: 75 + '%'}}>
                <div class="card-body">
                    <h1 class="display-5">History</h1>
                    <p class="lead">
                    What am I? Who am I? ...Why am I?.
                    </p>
                    <p>
                    Recipe Builder was developed as a class project for CS 361 - Software Engineering 1 - at Oregon State University. The impetus for it was to solve a problem my wife and I struggle with weekly...writing down a grocery list from the same collection of recipes. 
                    </p>
                    <p>
                    Who hasn’t been there? You just made a beloved pasta dish last week and you think to yourself, “I know! I’ll make my life easier and have the same thing this week!” Then you go through the arduous task of finding the recipe book and copying every listed ingredient onto a scrap of paper... 
                    </p>
                    <p>RECIPE BUILDER to the rescue!</p>
                </div>
            </div>
        </>
    )
}

export default About;