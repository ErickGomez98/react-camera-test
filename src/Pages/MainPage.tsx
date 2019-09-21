import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router';

const MainPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [success, setSuccess] = useState(false);
    const [readyToUse, setReadyToUse] = useState(false);
    let stream: MediaStream | null = null;

    useEffect(() => {
        navigator.permissions.query({ name: 'camera' })
            .then(res => {
                const { state } = res;
                switch (state) {
                    case 'prompt':
                        askForCameraPermission();
                        break;
                    case 'denied':
                        // show modal saying that user denied camera access 
                        break;
                }

            })


    }, []);

    const askForCameraPermission = (): Promise<void> => {
        return navigator.mediaDevices.getUserMedia({ video: {} })
            .then((videoStream) => {
                if (videoRef.current) {
                    stream = videoStream;
                } else {
                    throw new Error("There's an error with the videoRef");
                }
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    const enableCamera = async () => {
        try {
            await askForCameraPermission();
            if (videoRef.current) {
                setReadyToUse(true);
                videoRef.current.srcObject = stream;
            } else {
                // Show error in case the videoRef doesn't exist
            }
        } catch (err) {
            // This will be a Permission Denied error, show an error describing it
        }
    }

    const takePicture = () => {
        if (canvasRef.current) {
            const context: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
            if (context && videoRef) {
                const player: any = videoRef.current;
                context.drawImage(player, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }

    const sendPicture = () => {
        if (canvasRef.current) {
            canvasRef.current.toBlob((blob: any) => {
                const file: File = new File([blob], 'imageFaceRecognition.png', {
                    type: 'image/png'
                });
                const fd = new FormData();
                fd.append('image', file);

                fetch('http://httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: fd

                })
                    .then(res => {
                        console.log(res)
                        setTimeout(() => {
                            setSuccess(true)
                        }, 2000)
                    })
            });
        }
    }

    if (success) {
        return <Redirect to='/success-redirect' />
    }

    return (
        <>
            <video className={!readyToUse ? 'isHidden' : ''} ref={videoRef} autoPlay />
            <button onClick={enableCamera}>enable camera</button>
            <button onClick={takePicture}>take a picture</button>
            <canvas className={!readyToUse ? 'isHidden' : ''} ref={canvasRef} width={500} height={500}></canvas>
            <button onClick={sendPicture}>Send picture</button>
        </>
    )
}

export default MainPage;