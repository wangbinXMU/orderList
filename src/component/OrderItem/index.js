import React, { Component } from 'react'
import './style.css'
class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            comment: props.data.comment || '',
            errorTip: ''
        }
        this.handleOpenEditArea = this.handleOpenEditArea.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }
    handleOpenEditArea() {
        this.setState({ editing: !this.state.editing })
    }
    handleChooseStar(item) {
        this.setState({ stars: item })
    }
    handleCommentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }
    handleCancelComment = () => {
        this.setState({
            editing: false,
            comment: this.props.data.comment || '',
            stars: this.props.data.stars || 0
        })
    }
    handleSubmitComment = () => {
        let cmContent = this.state.comment;
        let { id } = this.props.data;
        let { comment, stars } = this.state;
        let len = cmContent.length;
        // 评论至少5个字符，且不能全为空格
        if (len >= 5 && !/^[ ]+$/.test(cmContent) && stars > 0) {
            this.setState({
                editing: false,
                errorTip: ''
            })
            this.props.onSubmit(id, comment, stars)
        } else {
            this.setState({
                errorTip: '评论少于5个字或未打分...'
            })
        }
    }
    render() {
        const { shop, product, price, picture, ifCommented } = this.props.data;
        return (
            <div className='orderItem'>
                <div className='orderItem__picContainer'>
                    <img className='orderItem__pic' src={picture} alt="#" />
                </div>
                <div className='orderItem__content'>
                    <h4 className='orderItem__product'>{product}</h4>
                    <h4 className='orderItem__shop'>{shop}</h4>
                    <div className='orderItem_btn_group'>
                        <div className='orderItem__price'>￥{price}</div>
                        <div>
                            {
                                ifCommented ? <button className='orderItem__btn orderItem__btn--grey'>已评价</button> :
                                    <button className='orderItem__btn orderItem__btn--red'
                                        onClick={this.handleOpenEditArea}
                                    >评价</button>
                            }
                        </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea() : null}
            </div>
        );
    }
    // 将部分的JSX写在方法内，防止render方法的代码过长
    // 评论填写区域
    renderEditArea() {
        return (
            <div className='orderItem__commentContainer'>
                <span className='errorTip'>{this.state.errorTip}</span>
                <textarea
                    onChange={this.handleCommentChange}
                    value={this.state.comment}
                    placeholder='请输入评价...'
                    className='orderItem__comment'
                />
                {this.renderStars()}
                <button
                    className='orderItem__btn__comment orderItem__btn__comment--grey'
                    onClick={this.handleCancelComment}
                >取消</button>
                <button
                    className='orderItem__btn__comment orderItem__btn__commenet--red'
                    onClick={this.handleSubmitComment}
                >提交</button>
            </div>
        )
    }
    // 五角星打分区域,五角星的处理,图片或者五角星字符
    renderStars() {
        const { stars } = this.state;
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        return stars >= item ? <span key={index}
                            className='orderItem__star orderItem__star--light'
                            onClick={this.handleChooseStar.bind(this, item)}
                        >★</span> :
                            <span
                                key={index} className='orderItem__star'
                                onClick={this.handleChooseStar.bind(this, item)}
                            >★</span>
                    })
                }
            </div>
        )
    }
}

export default OrderItem;