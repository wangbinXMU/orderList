import React, {Component} from 'react'
import OrderItem from '../OrderItem'

class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        fetch('https://wd7948970600stlows.wilddogio.com/users.json')
        .then(res=>{
            res.json().then(data=>{
                console.log(data);
            //  这里要用根据不同用户而渲染不同的订单页面
            this.setState({
                data:data[0].orderList
            })
            })
        })
    }
    handleSubmit = (id,comment,stars)=>{
        let newData = this.state.data.map(item=>{
            return item.id === id?
            {
                ...item,comment,stars,ifCommented:true
            }
            :item
        });
        this.setState({
            data:newData
        })
    }
    render(){
        return (
            <div>
               {
                   this.state.data.map(item=><OrderItem 
                    key={item.id} data={item}
                    onSubmit = {this.handleSubmit}
                    />)
               }
            </div>
        )
    }
}
export default OrderList;

