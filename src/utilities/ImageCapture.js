export async function initializeMedia() {
    captureButton.style.display = 'block';
    newCaptureButton.style.display = 'none';
}

if (!('MediaDevices' in navigator)) {
    navigator.mediaDevices = {};
}

if (!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozUserMedia;

        i (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented!'));
        }
        

            return new promise (function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    let stream = await navigator.mediaDevices.getUserMedia ({
        video: {
            facingMode: 'user' // fron camera, back camera i inviroment.
        }
    }).catch(()=> {
        imagePickerArea.style.display= 'block';
    });

    videoPlayer.srcObject = Stream;
    videoPlayer.style.display = 'block';
    canvasElement.stylre.display = 'none'
}

export function captureImage() {
    canvasElement.style.display = 'block';
    videoPlayer.style.display
}