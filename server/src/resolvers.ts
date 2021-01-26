import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs"
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
    Query: {
        me: (_, __, { req }) => {
            if(!req.session.userId){
                return null;
            }
            return User.findOne(req.session.userId);
        }
    },
    Mutation: {
        register: async (_, {email, password}) => {
            const hashedPassword = await bcrypt.hash(password, 10) 
            User.create({
                email,
                password: hashedPassword
            }).save()

            return true
        },
        login: async(_,{email, password}, { req }) => {
            const user = await User.findOne({ where: { email }})
            if(!user){
                return null
            }

            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                return null
            }

            req.session.userId = user.id;

            return user
        },
        createSubscription: async(_, {source}, {req}) => {
            if(!req.session || !req.session){
                throw new Error('not authenticated')
            }

            const user = await User.findOne(req.session.userId)
            const customer = await stripe.customers.create({
                email: user?.email,
                source, 
            })

            user!.stripeId = customer.id;
            user!.type = 'paid';
            await user?.save();

            return user
        }

    }

}