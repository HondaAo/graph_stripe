import React from 'react' 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Subscription } from './account/Subscription';
import { Login } from './user/Login';
import { Me } from './user/Me';
import { Register } from './user/Register';


export const Routes: React.FC = () =>{
        return (
            <BrowserRouter>
              <Switch>
                 <Route path="/login" component={Login} />
                 <Route path="/register" component={Register} />
                 <Route path="/me" component={Me} />
                 <Route path="/subscription" component={Subscription} />
             </Switch>
            </BrowserRouter>
        );
}