import React, { useState } from 'react' 
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { RegisterMutation, RegisterMutationVariables} from '../schemaTypes'
import { RouteComponentProps } from 'react-router-dom'
const registerMutation = gql`
 mutation RegisterMutation($email: String!, $password: String!) {
         register(email: $email, password: $password)
 }
`

export const Register: React.FC<RouteComponentProps<{}>> = ({ history }) =>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return (
        <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
        {(mutate: any) => (
        <div>
         <form>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={async() => {
                  const res = await mutate({
                      variables: { email, password }
                  });
                  console.log(res)
                  history.push("/login")
          }}>Register</button>
         </form>
        </div>      
        )}        
        </Mutation>
    );
}