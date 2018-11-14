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
        fetch('/mock/orders.json')
            .then(res=>{
                if(res.ok){
                    res.json().then(data=>{
                        this.setState({
                            data:data
                        })
                    })
                }
            })
            .catch(err=>console.log(err))
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

