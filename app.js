// Set constraints for the video stream
// const constraints = { video: { facingMode: { exact: 'environment' }, width: 600, height: 378 }, audio: false };
// const constraints = { video: { facingMode: 'environment', width: 378, height: 600 }, audio: false };
// const constraints = { 
//     video: { 
//         facingMode: 'environment', 
//         width: { min: 378, ideal: 630, max: 630 }, 
//         height: { min: 600, ideal: 1000, max: 1000 } 
//     }, 
//     audio: false 
// };



// const constraints = { 
//     video: { 
//         facingMode: 'environment', 
//         width: { min: 600, max: 1000 }, 
//         height: { min: 378, max: 630 } 
//     }, 
//     audio: false 
// };

// const constraints = { 
//     video: { 
//         facingMode: 'environment', 
//         width: { min: 378, ideal: 630, max: 630 }, 
//         height: { min: 600, ideal: 1000, max: 1000 } 
//     }, 
//     audio: false 
// };



const constraints = { 
    video: { 
        resizeMode: 'crop-and-scale',
        facingMode: { exact: 'environment' }, 
        width: { min: 378, max: 630 }, 
        height: { min: 600, max: 1000 } 
    }, 
    audio: false 
};

const secondConstraints = {
    video: { 
        resizeMode: 'crop-and-scale',
        facingMode: { exact: 'environment' }, 
        width: { min: 600, max: 1000 }, 
        height: { min: 378, max: 630 } 
    }, 
    audio: false 
};

// const constraints = { 
//     video: { 
//         resizeMode: 'crop-and-scale',
//         facingMode: 'environment', 
//         width: { min: 378, ideal: 630, max: 630 }, 
//         height: { min: 600, ideal: 1000, max: 1000 } 
//     }, 
//     audio: false 
// };

// const secondConstraints = {
//     video: { 
//         resizeMode: 'crop-and-scale',
//         facingMode: 'environment', 
//         width: { min: 600, ideal: 1000, max: 1000 }, 
//         height: { min: 378, ideal: 630, max: 630 } 
//     }, 
//     audio: false 
// };

let track = null;

const outputTaken = {
    front: false,
    back: false
};

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraContainer = document.querySelector(".camera--view--container"),
    cameraOutputFront = document.querySelector("#camera--output-front"),
    cameraOutputBack = document.querySelector("#camera--output-back"),
    cameraTriggerContainer = document.querySelector(".camera-trigger-container"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cardSideText = document.querySelector("#cardSideText"),
    openCameraButton = document.querySelector('#openCameraButton'),
    mainContainer = document.querySelector('#camera');



// US driver license size
// width: 8.5725 cm
// height: 5.3975 cm

// 8.5725 -> 600px
// 5.3975 -> x
// x => 378px

/**
 * This function is used to play camera shutter sound
 */
const playCameraShutterSound = () => {
    console.log('Entering playCameraShutterSound() function');
    try {
        const audio = new Audio('camera-shutter-sound.mp3');
        audio.play();
    } catch (e) {
        console.log('Error in playing camera shutter sound', e);
    }
    console.log('Exiting playCameraShutterSound() function');
}

/**
 * This function is used to check whether the current orientation
 * is portrait or not
 * 
 * @returns true if portrait orientation otherwise false
 */
const isPortraitMode = () => window.matchMedia('(orientation: portrait)').matches;

/**
 * This function is used to check whether the current orientation
 * is landscape or not
 * 
 * @returns true if landscape orientation otherwise false
 */
const isLandscapeMode = () => window.matchMedia('(orientation: landscape)').matches;

/**
 * This function is used to check whether the media devices
 * is supported
 * 
 * @returns true if mediaDevices is supported otherwise false
 */
const isMediaDevicesSupported = () => 'mediaDevices' in navigator;

/**
 * This function is used to check whether the device is 
 * mobile/tablet or desktop device
 * 
 * @returns true if mobile/tablet otherwise false
 */
 const isMobileDevice = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

/**
 * This function is used to adjust the screen orientation
 */
const adjustScreen = () => {
    if (isLandscapeMode()) {
        console.log('landscape mode');
        cameraView.classList.add('h-100');
        cameraContainer.classList.add('landscape');
        cameraTriggerContainer.classList.add('landscape');
    }
    else {
        console.log('portrait mode');
        cameraView.classList.remove('h-100');
        cameraContainer.classList.remove('landscape');
        cameraTriggerContainer.classList.remove('landscape');
    }
}

/**
 * This function is used to open full screen mode.
 */
const openFullScreen = async () => {
    console.log('Entering openFullScreen()');
    const body = document.body;
    try {
        const data = await body.requestFullscreen({ navigationUI: "auto" });
        console.log('full screen data', data);
        lockScreen();
    } catch (e) {
        console.log('Error opening screen in full mode', e);
    }
    console.log('Exiting openFullScreen()');
}

/**
 * This function is used to lock screen when going to full screen
 * mode
 * @param mode 
 */
const lockScreen = async (mode = 'portrait') => {
    console.log(`Entering lockScreen(${mode})`);
    try {
        const data = await screen.orientation.lock(mode);
        console.log('lock data', data);
    } catch (e) {
        console.log('error in screen locking', e);
    }
    console.log(`Exiting lockScreen(${mode})`);
}

/**
 * This function is used to exit full screen mode
 */
const exitFullScreen = async () => {
    console.log('Entering exitFullSCreen() function');
    try {
        const data = await document.exitFullscreen();
        console.log('full screen data', data);
    } catch (e) {
        console.log('error in exiting full screen', e);
    }
    console.log('Exiting exitFullSCreen() function');
}

let o = null;
// Access the device camera and stream to cameraView
const cameraStart = async (c) => {
    // first adjust the screen mainly to adjust the screen if the 
    // camera is opened in landscape mode
    adjustScreen();

    console.log('Starting the camera');
    try {
        const stream = await navigator.mediaDevices.getUserMedia(c);
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
        o = stream;
        console.log('camera started successfully', stream);
        console.log(stream.getTracks()[0]);
    } catch (e) {
         if (JSON.stringify(c) != JSON.stringify(secondConstraints))
             cameraStart(secondConstraints);

        console.log('Error in starting camera', e);
    }
}

openCameraButton.onclick = function () {
    //openFullScreen();
    this.style.display = 'none'
    mainContainer.style.display = '';
    cameraStart(constraints);
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    console.log('Taking a snapshot');
    playCameraShutterSound();
    const cameraSensor = document.createElement('canvas');
    const context = cameraSensor.getContext('2d');

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    context.drawImage(cameraView, 0, 0, cameraSensor.width, cameraSensor.height);

    let cameraOutput = null;
    if (!outputTaken.front) {
        cameraOutput = cameraOutputFront;
        outputTaken.front = true;
        cameraOutput.classList.add("taken", "taken-front");
        cardSideText.textContent = "Back Side"
    } else {
        cameraOutput = cameraOutputBack;
        outputTaken.back = true;
        cameraOutput.classList.add("taken", "taken-back");
        cardSideText.textContent = ""
        cardSideText.style.display = 'none';
    }
    
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.style.display = 'block';

    console.log('Snapshot taken successfully');

    if (outputTaken.back) {
        exitFullScreen();

        cameraTrigger.style.display = 'none';

        // stop the camera
        console.log('closing the camera');
        track.stop();
        console.log('camera closed successfully');
    }
    
};

// Start the video stream when the window loads
if (isMobileDevice()) {
    console.log('mobile/tablet device');
    // window.addEventListener('load', cameraStart, false);
}
else {
    console.log('desktop device');
    // window.addEventListener('load', cameraStart, false);
}

window.onresize = function (e) {
    console.log('window:onresize', e);
    adjustScreen();
}

