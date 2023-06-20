import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Rate, Input } from 'antd';
import { sendRequest } from '../../../helpers/requestHelper';
import './food-review.css';
import axios from 'axios';
const { TextArea } = Input;

function FoodReview(props) {
  const [listComment, setListComment] = useState([]);
  const [newCommentRate, setNewCommentRate] = useState(0);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    fetchFoodReview();
  }, []);
  
  const fetchFoodReview = async () => {
    var url = `http://localhost:8000/api/v1/food/159/review`;
    const resp = await sendRequest({
      url: url,
      method: "GET",
    });    
    setListComment(resp.data['content']);
  }

  const getFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

  const handleCommentText = (event) => {
    setNewCommentText(event.target.value);
  };

  const postComment = async () => {
    var url = `http://localhost:8000/api/v1/food/159/review`;
    const data = { 
      rating: newCommentRate,
      review: newCommentText,
      userId: 3,
      img: null,
      };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    };
    const resp = await axios(url, options);
    setListComment([...listComment, resp.data['content']]);
    setNewCommentText('');
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="post-comment">
          <div className="post-avatar">
            <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mr-24"/>
            <Rate onChange={setNewCommentRate} value={newCommentRate} />
          </div>
          <div className="comment-text-box">
            <TextArea onChange={handleCommentText} value={newCommentText} rows={4} className="mt-12" placeholder=""/>
            <div className="comment-send-icon">              
              <Button type="text" onClick	={postComment}><i class="fa fa-paper-plane"></i></Button>
            </div>
          </div>  

        </div>
        <div className="food-info-list">
          <div className="food-info-item">
            <div className="food-info__label">
              Sao
            </div>
            <div className="food-info__detail">
              <Button type="text">Tất cả</Button>
              <Button type="text">1 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">2 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">3 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">4 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">5 <i class="fa fa-star c-star-color"></i></Button>
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              Thời gian
            </div>
            <div className="food-info__detail">
              <Button type="text">Tất cả</Button>
              <Button type="text">Gần đây</Button>              
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              Đính kèm
            </div>
            <div className="food-info__detail">
              <Checkbox>Ảnh</Checkbox>
              <Checkbox>Video</Checkbox>
            </div>
          </div>
        </div>
        <div className="review-list">
          {listComment.map((comment) => (
            <div className="review-block">
              <div className="review-block__header">  
                <div className="d-flex aic">
                  <div className="review-block__avatar">
                    <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
                  <div className="review-block__username">
                    {comment.userName}
                  </div>
                  <div className="review-block__date">
                    {getFormatDate(comment.updateAt)}
                  </div>
                </div>    
                <div className="d-flex aic">
                  <div className="review-block__rating mx-24 ">
                    <Rate disabled defaultValue={comment.rating}/>
                  </div>
                  <div className="review-block__like">
                    <i class="fa fa-heart"></i> {comment.reactNumber}
                  </div>
                </div>
              </div>
              <div className="review-block__body p-12">
                {comment.review}
              </div>
              <div className="review-block__footer d-flex mt-12">
                <div className="review-block__my-avatar mx-24">
                  <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="review-block__comment">
                  <Input placeholder="Phản hồi" />
                </div>
              </div>
            </div>
          ))}          
        </div>
      </div>      
    </React.Fragment>
  );
}

export default FoodReview;
// export default connect(mapState, mapDispatchToProps)(withTranslate(FoodReview));