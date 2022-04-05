import { React, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

const MoreInfo = styled.h2`
  text-align: center;
`;

function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  id = props.shoes.filter((shoe) => shoe.id == id)[0].id;
  let [alert, setAlert] = useState(true);
  let [inputContent, setInputContent] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  return (
    <div className="container">
      <div className="row">
        <MoreInfo>Detail</MoreInfo>
        <input onChange={(e) => setInputContent(e.target.value)}></input>
        {alert ? (
          <div className="my-alert">
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
        ) : null}
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
            width="100%"
            alt="shoe"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
