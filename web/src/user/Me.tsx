import { gql } from 'apollo-boost';
import React from 'react' 
import { Query } from 'react-apollo';
import { MeQuery } from '../schemaTypes';

interface MeProps {

}

const meQuery = gql`
 query MeQuery {
     me {
         id
         email
     }
 }
`;

export const Me: React.FC<MeProps> = () =>{
        return (
            <Query<MeQuery> query={meQuery}>
             {({data, loading}) => {
                if(loading){
                  return null;
                } 
                if(!data){
                    return <div>Data is nothing.</div>
                }

                if(!data.me){
                    return <div>No user exists.</div>
                }

                return <div>{data.me.email}</div>
              }}
            </Query>
        );
}