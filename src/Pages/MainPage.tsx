import React, { useState, useEffect, useRef } from 'react';

const MainPage = () => {
    const [count, setCount] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    console.log(videoRef);


    useEffect(() => {
        console.log("component did mount!")
        console.log(videoRef.current);
        if (videoRef.current) {
            console.log(videoRef.current.id)
        }
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                //videoRef.srcObject = stream;
                console.log(stream)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>


            <video id="player" ref={videoRef} controls></video>
        </>
    )
}

export default MainPage;