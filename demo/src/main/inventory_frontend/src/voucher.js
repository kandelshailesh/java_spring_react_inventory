import React from "react";
import {Link} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Sidebar from './Sidebar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker,Input,Select} from 'antd';
import { tsConstructorType } from "@babel/types";


const items = [
    { name: 'payment', label: 'Payment', faicon:'fa fa-dashcube fa-1x' },
    "divider",
    { name: 'receipt', label: 'Receipt',faicon:'fa fa-adjust fa-1x' },
    "divider",
    { name: 'contra', label: 'Contra',faicon:'fa fa-cart-plus fa-1x' },
    "divider",
    { name: 'journal', label: 'Journal',faicon:'fa fa-edit fa-1x' },
    "divider",
    { name: 'sales', label: 'Sales',faicon:'fa fa-home fa-1x'},
    "divider",
    { name: 'purchase', label: 'Purchase',faicon:'fa fa-home fa-1x' },
    "divider",
    { name: 'salesreturn', label: 'Sales Return',faicon:'fa fa-home fa-1x' },
    "divider",
    { name: 'purchasereturn', label: 'Purchase Return',faicon:'fa fa-home fa-1x' },
    "divider"
    
];


class CreatePaymentForm extends React.Component {
constructor(props)
{
super(props);
const {Option} = Select;
this.state={
    'trlist':[1]
}

}

// onchange = (e) =>
// {
//     var targetid= e.target.id.split('-')[1];

//     this.state.trlist.map((index1,result)=>
//     {
//         if(targetid===result.index)
//         {
//             this.setState(
//             {
//             trlist: {
//                     ...this.state.trlist,
//                 }
//             }
//             )

//         }
//     })
    
// }
submitHandler(e) {
    e.preventDefault();
}

createnewtransaction = (e) =>
{
    console.log(e.key);
    var targetid= Number(e.target.id.split('-')[1])+1;
    console.log(targetid);
    if(!this.state.trlist.includes(targetid) && e.key==="Enter")   
{
    this.state.trlist.push(targetid);
    this.setState({
        trlist:this.state.trlist
    })

    
    
}
}

checkdc = (e) =>
{
var id = e.target.id;
if(e.key==='c' || e.key==='d')
{
console.log("Ehh");
}
else
{
   e.preventDefault();
}
}
render(){
return(<>
<div class="row m-0 p-0">
            
    <div class="col-md-10 m-0 p-0">

<p style={{border:"1px solid cyan",backgroundColor:"cyan",color:"white",padding:"6px"}}>Accounting Voucher Creation <i style={{marginLeft:"30%"}}>Company Name</i> </p>
<div className="row">
    <div className="col-md-4 text-center">
<label className="ml-2">Voucher Type:</label><label className="ml-2" style={{fontWeight:"bold"}}>Payment</label>
</div>
<div className="col-md-4 text-center">
<label>Voucher No:</label><label className="ml-2"  style={{fontWeight:"bold"}} >2</label>
</div>
<div className="col-md-4 text-center">
<label>Date:</label><label className="ml-2 mt-n2"  style={{fontWeight:"bold"}}><DatePicker></DatePicker></label>
</div>
</div>
{/* <div className="row">
    <div className="col-md-6 ml-5">
<label className="ml-2">Accountname</label><label className="ml-2" style={{fontWeight:"bold"}}><Select value="1"><Option value="1">Helloadfssssssssss</Option>
<Option value="2">Helloadsfadsfffffffffff</Option></Select></label>

</div>

</div> */}
<form className="paymentvoucherform" onSubmit={this.submitHandler}>
<table className="table table-bordered text-center ">
    <tr className="row ml-3 mr-3">
        <td className="col-md-2">Cr/Dr Type</td>
        <td className="col-md-6">A/C Name</td>
        <td className="col-md-3" >Amount</td>
        </tr>
{ this.state.trlist.map((result,index)=>(
        <tr className="row ml-3 m-0 p-0 border-0 mr-3 text-center">
        <td className="col-md-2"><Input name="dctype" onKeyPress={this.checkdc} maxLength="1" id={`dctype-${result}`} className="text-center"/></td>
        <td className="col-md-6"><Input name="acname"  id={`acname-${result}`}  className="text-center"/></td>
        <td className="col-md-3" ><Input name="dcamount" id={`dcamount-${result}`}  onKeyPress={this.createnewtransaction} className="text-center"/></td>
        </tr>
))}
    </table>
    <div className="float-right mr-5">
    <button type="submit" className="btn btn-sm btn-primary">Submit</button>
    </div>
    </form>

    </div>
    <div class="col-md-2 m-0 p-0">
     <Sidebar items={items}></Sidebar>
    </div>
</div>
 
    </>
);
}
}

export default CreatePaymentForm;
