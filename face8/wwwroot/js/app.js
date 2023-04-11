
//async function loadScripts() {
//    async function loadScript(src) {
//        return new Promise((resolve, reject) => {
//            const script = document.createElement('script');
//            script.src = src;
//            script.onload = () => resolve(script);
//            script.onerror = (error) => reject(error);
//            document.head.append(script);
//        });
//    }

//    try {
//        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.12.0');
//        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.0.7');
//        console.log('TensorFlow.js and BlazeFace have been loaded successfully');
//    } catch (error) {
//        console.error(`Failed to load script: ${error}`);
//    }
//}

////async function detectFaces(video, model) {
////    const canvas = document.getElementById('canvas');
////    const ctx = canvas.getContext('2d');

////    while (true) {
////        const predictions = await model.estimateFaces(video);

////        ctx.clearRect(0, 0, canvas.width, canvas.height);
////        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

////        predictions.forEach(prediction => {
////            const [x, y, width, height] = prediction.topLeft.concat(prediction.bottomRight);

////            ctx.beginPath();
////            ctx.lineWidth = 2;
////            ctx.strokeStyle = 'green';
////            ctx.rect(x, y, width - x, height - y);
////            ctx.stroke();
////        });

////        await tf.nextFrame();
////    }
////}
//async function detectFaces(video, model) {
//    const canvas = document.getElementById('canvas');
//    const ctx = canvas.getContext('2d');

//    while (true) {
//        const predictions = await model.estimateFaces(video);

//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//        predictions.forEach(prediction => {
//            const [x, y, width, height] = prediction.topLeft.concat(prediction.bottomRight);

//            ctx.beginPath();
//            ctx.lineWidth = 2;
//            ctx.strokeStyle = 'green';
//            ctx.rect(x, y, width - x, height - y);
//            ctx.stroke();
//        });

//        const faceCount = predictions.length;
//        prevFramesFaceCounts.push(faceCount);

//        if (prevFramesFaceCounts.length > frameMemory) {
//            const prevFaceCount = prevFramesFaceCounts.shift();
//            const newInFrameCount = Math.max(faceCount - prevFaceCount, 0);
//            const newOutFrameCount = Math.max(prevFaceCount - faceCount, 0);

//            if (newInFrameCount > 0 || newOutFrameCount > 0) {
//                totalInFrameCount += newInFrameCount;
//                totalOutFrameCount = Math.min(totalOutFrameCount + newOutFrameCount, 15);

//                sendDataToBackend(totalInFrameCount, totalOutFrameCount);
//            }
//        }

//        await tf.nextFrame();
//    }
//}




//async function startFaceDetection() {
//    const video = document.getElementById('video');

//    try {
//        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//        video.srcObject = stream;
//        await video.play();

//        const model = await blazeface.load();

//        detectFaces(video, model);
//    } catch (error) {
//        console.error(`Failed to start face detection: ${error}`);
//    }
//}


//async function sendDataToBackend(inFrameCount, outFrameCount) {
//    const response = await fetch('/api/UpdateFaceCounts', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify({ inFrameCount, outFrameCount })
//    });

//    if (response.ok) {
//        document.getElementById('in-frame-count').innerText = inFrameCount;
//        document.getElementById('out-frame-count').innerText = outFrameCount;
//    } else {
//        console.error('Failed to send data to backend');
//    }
//}

//let prevFaceCount = 0;
//let previousInFrameCount = 0;
//let previousOutFrameCount = 0;
//const prevFramesFaceCounts = [];
//const frameMemory = 5;


//let totalInFrameCount = 0;
//let totalOutFrameCount = 0;

//function updateCounter(predictions) {
//    let inFrameCount = predictions.length;
//    let outFrameCount = 0;

//    if (inFrameCount < previousInFrameCount) {
//        outFrameCount = previousInFrameCount - inFrameCount;
//        sendDataToBackend(inFrameCount, outFrameCount);
//    }

//    previousInFrameCount = inFrameCount;
//}



//loadScripts().then(() => {
//    if (document.readyState === 'loading') {
//        document.addEventListener('DOMContentLoaded', startFaceDetection);
//    } else {
//        startFaceDetection();
//    }
//});

////async function loadScript(src) {
////    return new Promise((resolve, reject) => {
////        const script = document.createElement('script');
////        script.src = src;
////        script.onload = () => resolve();
////        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
////        document.head.append(script);
////    });
////}

////const video = document.getElementById('video');
////const canvas = document.getElementById('canvas');
////const ctx = canvas.getContext('2d');
////const countInFrame = document.getElementById('countInFrame');
////const countOutOfFrame = document.getElementById('countOutOfFrame');

////let inFrameCount = 0;
////let outOfFrameCount = 0;
////let facesInFrame = new Set();

////async function setupCamera() {
////    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false });
////    video.srcObject = stream;
////    return new Promise((resolve) => {
////        video.onloadedmetadata = () => {
////            video.play();
////            resolve(video);
////        };
////    });
////}

////async function detectFaces(video, model) {
////    ctx.clearRect(0, 0, canvas.width, canvas.height);
////    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

////    const faces = await model.estimateFaces(video, false);

////    faces.forEach((face) => {
////        ctx.beginPath();
////        ctx.lineWidth = 2;
////        ctx.strokeStyle = 'blue';
////        ctx.rect(face.topLeft[0], face.topLeft[1], face.bottomRight[0] - face.topLeft[0], face.bottomRight[1] - face.topLeft[1]);
////        ctx.stroke();

////        // Update face count
////        if (!facesInFrame.has(face.face_id)) {
////            inFrameCount++;
////            countInFrame.textContent = inFrameCount;
////            facesInFrame.add(face.face_id);
////        }
////    });

////    facesInFrame.forEach((faceId) => {
////        if (!faces.some((face) => face.face_id === faceId)) {
////            outOfFrameCount++;
////            countOutOfFrame.textContent = outOfFrameCount;
////            facesInFrame.delete(faceId);
////        }
////    });

////    requestAnimationFrame(() => detectFaces(video, model));
////}

////async function main() {
////    try {
////        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.12.0');
////        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.0.7');
////        console.log('TensorFlow.js and BlazeFace have been loaded successfully');

////        await tf.setBackend('webgl');
////        const videoElement = await setupCamera();
////        const model = await blazeface.load();
////        detectFaces(videoElement, model);
////    } catch (error) {
////        console.error(`Failed to load script: ${error}`);
////    }
////}

////main();

async function loadScripts() {
    async function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = (error) => reject(error);
            document.head.append(script);
        });
    }

    try {
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.12.0');
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.0.7');
        console.log('TensorFlow.js and BlazeFace have been loaded successfully');
    } catch (error) {
        console.error(`Failed to load script: ${error}`);
    }
}

async function detectFaces(video, model) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    while (true) {
        const predictions = await model.estimateFaces(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        predictions.forEach(prediction => {
            const [x, y, width, height] = prediction.topLeft.concat(prediction.bottomRight);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';
            ctx.rect(x, y, width - x, height - y);
            ctx.stroke();
        });

        updateCounter(predictions);

        await tf.nextFrame();
    }
}

let previousInFrameCount = 0;
let outFrameCount = 0;
let frameWithoutFaces = 0;
let lastSentOutFrameCount = 0;

function updateCounter(predictions) {
    let inFrameCount = predictions.length;

    if (inFrameCount === 0) {
        frameWithoutFaces++;
    } else {
        frameWithoutFaces = 0;
    }

    if (frameWithoutFaces > 3 && previousInFrameCount > 0) {
        outFrameCount++;
        previousInFrameCount = 0;
    } else if (inFrameCount > 0) {
        previousInFrameCount = inFrameCount;
    }

    if (outFrameCount !== lastSentOutFrameCount) {
        sendDataToBackend(inFrameCount, outFrameCount);
        lastSentOutFrameCount = outFrameCount;
    }

    document.getElementById('in-frame-count').innerText = inFrameCount;
    document.getElementById('out-frame-count').innerText = outFrameCount;
    localStorage.setItem('outFrameCount', outFrameCount);
}

function initializeOutFrameCount() {
    const savedOutFrameCount = localStorage.getItem('outFrameCount');
    if (savedOutFrameCount) {
        outFrameCount = parseInt(savedOutFrameCount);
        document.getElementById('out-frame-count').innerText = outFrameCount;
    } else {
        outFrameCount = 0;
    }
}

loadScripts().then(() => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeOutFrameCount();
            startFaceDetection();
        });
    } else {
        initializeOutFrameCount();
        startFaceDetection();
    }
});

async function startFaceDetection() {
    const video = document.getElementById('video');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();

        const model = await blazeface.load();

        detectFaces(video, model);
    } catch (error) {
        console.error(`Failed to start face detection: ${error}`);
    }
}

async function sendDataToBackend(inFrameCount, outFrameCount) {
    const response = await fetch('/api/UpdateFaceCounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ OutFrameCount: outFrameCount })
    });

    if (response.ok) {
        document.getElementById('in-frame-count').innerText = inFrameCount;
        document.getElementById('out-frame-count').innerText = outFrameCount;
    } else {
        console.error('Failed to send data to backend');
    }
}








