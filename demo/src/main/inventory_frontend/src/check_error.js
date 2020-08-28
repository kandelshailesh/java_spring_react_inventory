import store from 'store';
const check_error = (response) =>
{
    console.log(response);

    if(response.status===401)
    {
      window.location.replace('/login');
      store.set('isloggedin',false);
      store.remove('token');
      
    }
}

export default check_error;