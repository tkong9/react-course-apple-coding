import './App.css';
import React, { useState } from 'react';
import thumbsUp from './images/thumbs-up-solid.svg';

function App() {
  let [titles, changeTitles] = useState([
    '남자 코트 추천',
    '강남 맛집 추천',
    '구글 가자',
  ]);
  let [likeCnt, setLikeCnt] = useState(0);
  let [inputBoxVal, setInputBoxVal] = useState();

  function incrementLikeCnt() {
    setLikeCnt(likeCnt + 1);
  }

  function addTitle() {
    let newTitles = [...titles];
    newTitles.push(inputBoxVal);
    changeTitles(newTitles);
    setInputBoxVal('');
  }

  function List(props) {
    return (
      <div className="list">
        <h3>
          {props.title}
          <span>
            <img src={thumbsUp} alt="thumbs-up" className="thumbs-up" />
          </span>{' '}
          {likeCnt}
        </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>
    );
  }

  function multipleList() {
    let arr = [];
    for (let i = 0; i < titles.length; i++) {
      arr.push(<List title={titles[i]} />);
    }
    return arr;
  }

  function getUserInput(e) {
    setInputBoxVal(e.target.value);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      {multipleList()}
      <div className="publish">
        <input onChange={getUserInput} value={inputBoxVal} />
        <button onClick={addTitle}>저장</button>
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
