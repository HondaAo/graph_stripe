import { gql } from 'apollo-boost';
import React from 'react' 
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout'
import { createSubscriptionMutation, createSubscriptionMutationVariables} from '../schemaTypes'
interface SubscriptionProps {

}

const CreateSubscriptionMutation = gql`
 mutation createSubscriptionMutation($source: String!) {
     createSubscription(source: $source){
        id
        email
     }
 }
`

export const Subscription: React.FC<SubscriptionProps> = ({}) =>{
        return (
            <Mutation<createSubscriptionMutation, createSubscriptionMutationVariables> mutation={CreateSubscriptionMutation}>
            {(mutate) => (
              <StripeCheckout
              token={async (token) => {
                  const response = await mutate({variables: { source: token.id}})
                  console.log(response)
              }}
              stripeKey={process.env.STRIPE_KEY!}
               /> 
            )}
             
            </Mutation>
        );
}