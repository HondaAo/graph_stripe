import React, { useState } from 'react' 
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'
import { LoginMutation, LoginMutationVariables } from '../schemaTypes';

const loginMutation = gql`
 mutation LoginMutation($email: String!, $password: String!) {
         login(email: $email, password: $password){
             id
             email
         }
 }
`

export const Login: React.FC<RouteComponentProps<{}>> = ({ history }) =>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    return (
        <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
        {(mutate) => (
        <div>
         <form onSubmit={async(e) => {
                  e.preventDefault();
                  const res = await mutate({
                      variables: { email, password }
                  });
                  console.log(res)
                  history.push("/me")
          }}>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="login" />
         </form>
        </div>      
        )}        
        </Mutation>
    );
}