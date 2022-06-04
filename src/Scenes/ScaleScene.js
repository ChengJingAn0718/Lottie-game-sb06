import "../stylesheets/styles.css";
import "../stylesheets/button.css";

import { useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage";
import { prePathUrl } from "../components/CommonFunctions";
import { returnAudioPath } from "../utils/loadSound";
import { Player } from '@lottiefiles/react-lottie-player';

import IntroScene from "./IntroScenes"
import { introLetterList } from "../components/CommonVariants";

const audioPath = [
    { first: '02', second: '03', third: '04' },
    { first: '12', second: '14', third: '00' },
    { first: '17', second: '19', third: '00' },
    { first: '24', second: '25', third: '00' },
    { first: '29', second: '30', third: '00' },
    { first: '34', second: '35', third: '00' },
    { first: '39', second: '40', third: '00' },
    { first: '44', second: '45', third: '00' },
    { first: '49', second: '50', third: '51' },
    { first: '54', second: '55', third: '00' },
    { first: '57', second: '58', third: '00' }, //89
    { first: '61', second: '62', third: '00' },
    { first: '63', second: '64', third: '00' },
    { first: '68', second: '69', third: '00' },
    { first: '73', second: '74', third: '75' },
    { first: '78', second: '79', third: '00' },
    { first: '83', second: '84', third: '00' },
    { first: '88', second: '89', third: '00' }, //18
    { first: '91', second: '92', third: '00' },
    { first: '96', second: '98', third: '00' },
    { first: '101', second: '102', third: '00' },
    { first: '106', second: '107', third: '00' },
    { first: '111', second: '112', third: '00' }, //23
    { first: '116', second: '117', third: '00' }, //24
    { first: '121', second: '122', third: '00' },
    { first: '126', second: '127', third: '00' },
    { first: '131', second: '132', third: '00' },
    { first: '136', second: '137', third: '00' },
    { first: '141', second: '142', third: '00' },
    { first: '146', second: '147', third: '00' },
    { first: '151', second: '152', third: '00' },
    { first: '156', second: '157', third: '00' },
    { first: '161', second: '162', third: '00' },
    { first: '166', second: '167', third: '00' },
    { first: '171', second: '172', third: '00' },
    { first: '175', second: '176', third: '00' },
    { first: '178', second: '179', third: '00' },
    { first: '183', second: '184', third: '00' },
]


const scaleInfoList = [
    { s: 1.4, l: 0, t: 0 },
    { s: 1.4, l: 20, t: -5 },
    { s: 1.4, l: 0, t: -20 },
    { s: 1.3, l: 15, t: 5 },
    { s: 1.4, l: -5, t: -5 },
    { s: 1.4, l: 10, t: -5 },
    { s: 1.4, l: 0, t: 0 },
    { s: 1.2, l: 0, t: 0 },
    { s: 1.4, l: 0, t: 0 },
    { s: 1.4, l: 0, t: -10 },
    { s: 1.4, l: -5, t: 0 },
    { s: 1.4, l: -5, t: 0 },

    { s: 1.8, l: 5, t: 0 },
    { s: 1.6, l: 0, t: 10 },
    { s: 1.4, l: 0, t: 0 },
    { s: 1.4, l: 0, t: 0 }, //15
    { s: 1.2, l: 0, t: -10 },
    { s: 1.4, l: 0, t: -10 },
    { s: 1.6, l: 0, t: -20 },
    { s: 1.2, l: 0, t: -10 },

    { s: 1.4, l: 0, t: -20 },
    { s: 1.3, l: -15, t: 5 },
    { s: 1.3, l: -5, t: -3 },
    { s: 1.4, l: 0, t: 10 },
    { s: 1.6, l: 0, t: 20 },
    { s: 1.6, l: 0, t: -20 },
    { s: 1.6, l: 5, t: -20 },
    { s: 1.6, l: 0, t: -20 },
    { s: 1.4, l: -20, t: -10 },
    { s: 1.3, l: 0, t: 0 },
    { s: 1.4, l: 0, t: -20 },
    { s: 1.4, l: 0, t: -20 },
    { s: 1.4, l: 0, t: -20 },
    { s: 1.4, l: 0, t: -15 },
    { s: 1.4, l: 0, t: 0 },
    { s: 1.8, l: 0, t: -30 },
    { s: 1.4, l: 5, t: -10 },
    { s: 1.6, l: 0, t: 0 },

]


let timerList = []

export default function Scene({ nextFunc, _baseGeo, currentLetterNum, _geo,
    audioList
}) {
    const parentObject = useRef()
    const turtleBaseRef = useRef();
    const introturtle = useRef();
    const scaleRef = useRef()
    const scaleBase = useRef()
    const skipButton = useRef()

    useEffect(() => {

        audioList.bodyAudio1.src = returnAudioPath(audioPath[currentLetterNum].first)
        audioList.bodyAudio2.src = returnAudioPath(audioPath[currentLetterNum].second)
        if (audioPath[currentLetterNum].third != '00')
            audioList.bodyAudio3.src = returnAudioPath(audioPath[currentLetterNum].third);


        timerList[10] = setTimeout(() => {

            audioList.bodyAudio1.play()
            introturtle.current.play()

            skipButton.current.className = 'aniObject'
            timerList[12] = setTimeout(() => {
                skipButton.current.className = 'commonButton'
            }, 1000);


            timerList[1] = setTimeout(() => {
                introturtle.current.stop()
                if (currentLetterNum != 11 && currentLetterNum != 5 && currentLetterNum != 16)
                    timerList[2] = setTimeout(() => {
                        scaleRef.current.className = 'show-item'
                        timerList[3] = setTimeout(() => {
                            audioList.bodyAudio2.play()

                            timerList[4] = setTimeout(() => {
                                scaleRef.current.style.transform = 'translate(' + scaleInfoList[currentLetterNum].l + '%,' + scaleInfoList[currentLetterNum].t + '%'
                                    + ') scale(' + scaleInfoList[currentLetterNum].s + ') '
                                scaleRef.current.style.transition = '3s'
                            }, 1000);

                            timerList[5] = setTimeout(() => {
                                if (audioPath[currentLetterNum].third != '00') {
                                    audioList.bodyAudio3.play()

                                    timerList[6] = setTimeout(() => {
                                        nextFunc()
                                    }, audioList.bodyAudio3.duration * 1000 + 3000);
                                }
                                else
                                    timerList[7] = setTimeout(() => {
                                        nextFunc()
                                    }, 3000);
                            }, audioList.bodyAudio2.duration * 1000);
                        }, 2000);
                    }, 700);
                else
                    timerList[8] = setTimeout(() => {
                        nextFunc()
                    }, 1000);

            }, audioList.bodyAudio1.duration * 1000);
        }, 3000);

        return () => {
            timerList.map(timer => { clearTimeout(timer); console.log('timer', timer) })

            audioList.bodyAudio1.pause()
            audioList.bodyAudio2.pause()
            audioList.bodyAudio3.pause()

            audioList.bodyAudio1.currentTime = 0;
            audioList.bodyAudio2.currentTime = 0;
            audioList.bodyAudio3.currentTime = 0;
        }

    }, [])



    return (
        <div
            className="aniObjectDelay"
            ref={parentObject}
            style={{
                position: "fixed", width: _baseGeo.width + "px"
                , height: _baseGeo.height + "px",
                left: _baseGeo.left + 'px',
                top: _baseGeo.bottom + 'px',
            }}
        >

            <Player
                src={prePathUrl() + 'lottieFiles/character/fishes.json'}
                loop
                autoplay
                style={{
                    position: 'absolute',
                    width: '100%',
                    left: '0%',
                    top: '0%',
                    pointerEvents: 'none',
                    overflow: 'visible'
                }}
            >
            </Player>


            <div
                className=""
                style={{
                    position: 'absolute',
                    width: introLetterList[currentLetterNum].s * 100 + '%',
                    left: introLetterList[currentLetterNum].l * 100 + '%',
                    top: introLetterList[currentLetterNum].t * 100 + '%',
                    pointerEvents: 'none',
                    overflow: 'visible'
                }}
            >
                <BaseImage
                    url={"SB06/letters/sb06_svg_vyanjan_" + introLetterList[currentLetterNum].path + ".svg"}
                />
            </div>

            <div
                ref={turtleBaseRef}
                style={{
                    position: "fixed", width: _baseGeo.width + "px"
                    , height: _baseGeo.height + "px",
                    left: _baseGeo.left + 'px',
                    top: _baseGeo.bottom + 'px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '25%',
                        left: '58%',
                        top: '25%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                    <Player
                        ref={introturtle}
                        src={prePathUrl() + 'lottieFiles/character/turtle.json'}
                        loop
                        style={{
                            position: 'absolute',
                            width: '100%',
                            left: '0%',
                            top: '0%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </div>
            </div>
            <div
                className="aniObject"
                ref={scaleBase}
                style={{
                    position: "fixed", width: _baseGeo.width + "px"
                    , height: _baseGeo.height + "px",
                    left: _baseGeo.left + 'px',
                    top: _baseGeo.bottom + 'px',
                }}
            >
                <div
                    ref={scaleRef}
                    className='hideObject'
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '0%',
                        top: '0%',
                    }}
                >
                    <IntroScene currentLetterNum={currentLetterNum} />
                </div>
            </div>

            <div
                ref={skipButton}
                className='hideObject'
                onClick={() => {
                    timerList[0] = setTimeout(() => {
                        nextFunc();
                    }, 200);
                }}
                style={{
                    position: "fixed", width: _geo.width * 0.055 + "px",
                    height: _geo.width * 0.055 + "px",
                    right: "2%"
                    , bottom: "5%", cursor: "pointer",
                }}>
                <img
                    draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/Buttons/Skip_blue.svg'}
                />
            </div>
        </div>
    );
}

var list = []