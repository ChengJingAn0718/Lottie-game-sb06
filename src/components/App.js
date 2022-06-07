
import React, { useState, useEffect, useRef } from 'react';

import TitleScene from "../Scenes/TitleScene";
import ScaleScene from "../Scenes/ScaleScene";
import DrawingScene from "../Scenes/DrawingScene";
import ExcellentScene from "../Scenes/ExcellentScene";
import { MusicButton } from './CommonButtons';

import "../stylesheets/styles.css";
import "../stylesheets/button.css";

import { prePathUrl, Switch } from "./CommonFunctions";


var __geo;
var backgroundImageIndex = 0;
var backgroundImageList = [
  "SB_05_BG_01", //1
  "SB_05_BG_01",
  "SB_05_shaabash_01"
];


const App = ({ geo, _setBackground, controlIntroImg, _startTransition,
  _hideIntroTitle, _showIntroTitle, baseGeo, _isBackloaded, _audioList,
  currentSceneNumber, bgLoad
}, ref) => {

  const [index, setIndex] = useState(0);
  const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);
  const musicRef = useRef();
  const scaleRef = useRef()
  __geo = geo;

  useEffect(
    () => {
      return () => {
      }
    }, []
  )

  function changeBackgroundImage(judgeNum) {
    if (judgeNum != backgroundImageIndex) {
      backgroundImageIndex = judgeNum;
      _setBackground(backgroundImageList[judgeNum]);
    }
  }

  function setFomart(sceneNum) {
    setIndex(sceneNum);
    changeBackgroundImage(sceneNum);
  }

  React.useImperativeHandle(ref, () => ({
    nextFunc: () => {
      scaleRef.current.startGame()
      musicRef.current.fomartSound()
      _hideIntroTitle()

    },

  }))

  function nextFunc() {
    setFomart(index + 1);
  }

  function goHome() {
    backgroundImageIndex = 0;
    musicRef.current.setClass('hideObject')

    _audioList.backAudio.pause();
    _audioList.backAudio.currentTime = 0;

    controlIntroImg(true)
    setIndex(0);
    _showIntroTitle();
    _setBackground(backgroundImageList[0])
  }


  return (
    <div >
      <div className={_isBackloaded ? '' : ''}>
        <Switch test={index}>
          <ScaleScene key={0} ref={scaleRef} currentLetterNum={currentSceneNumber} bgLoad={bgLoad} nextFunc={nextFunc} _baseGeo={baseGeo}
            audioList={_audioList} _geo={__geo} value={0} />
          <DrawingScene key={1}
            startTransition={_startTransition}
            currentLetterNum={currentSceneNumber} nextFunc={nextFunc} _baseGeo={baseGeo} audioList={_audioList} _geo={__geo} value={1} />
          <ExcellentScene key={2} nextFunc={goHome} audioList={_audioList} _geo={__geo} value={2} _baseGeo={baseGeo} />
        </Switch>
      </div>

      <MusicButton ref={musicRef} _geo={__geo} backAudio={_audioList.backAudio} />

    </div >
  );
}

export default React.forwardRef(App);
