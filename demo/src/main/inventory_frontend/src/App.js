import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import mainpage from './mainpage';
import vouchernavbar from './voucher';
import createnavbar from './bottomnavbar';

import Login from './Login/login';

class App extends Component
{
constructor(props)
{
  super(props);
  this.state={
    login:false
  }
}
render()
{
  return(
    <>
    <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={mainpage}/>
    </Switch>
    </BrowserRouter>
    
    </>
  )
//   const {login} = this.state;
//   if(!login)
//   {
    
//     return(
//       <>
//       <BrowserRouter>
//       <Route path="/login"  component={Login}>
//    </Route>   
//            </BrowserRouter>
//            </>)
//   }
//   else
//   {
//   return(
//     <div>
//     <BrowserRouter>
//     <Route path="/" component={mainpage}>
//  </Route>    
//    </BrowserRouter>
//   </div>
//   )
//   }
}
}
// const App = () => (
//       <div>
//         <BrowserRouter>
//         <Route path="/" component={mainpage}>
//      </Route>    
//        </BrowserRouter>
//       </div>
//     );

export default App;

