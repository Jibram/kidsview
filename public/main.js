window.onload = function() {
    //start the webgazer tracker
    webgazer.setRegression('linear') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if( webgazer.pupil.getPupils() ){
               //console.log("left pupil: ", eyesObj.left.pupil, "\t right pupil: ", eyesObj.right.pupil);
               console.log(eyesObj);
            }
        })
        .begin()
        .showPredictionPoints(false); /* shows a square every 100 milliseconds where current prediction is */


    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            //setup();
            webgazer.setVideoViewerSize(500,500);
            webgazer.showVideo(true);
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};

//called before 'unload' or leaving page
window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
    
    var d = new Date();
    d.setTime(d.getTime() + (1*60*1000)); //1 minute lifetime
    var expires = "expires="+ d.toUTCString();

    this.document.cookie="state=patient_done;" + expires + ";path=/;";
    document.cookie="meData=dummydata;" + expires + ";path=/;";
    document.cookie="ended=true;" + expires + ";path=/;";
    document.cookie="MEdone=true;" + expires + ";path/;";
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    //ClearCalibration();
    //PopUpInstruction();
}
