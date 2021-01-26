import  { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { createConnection } from 'typeorm'
import {resolvers} from './resolvers'
import { typeDefs } from './typeDefs'
import * as session from "express-session"
import "dotenv/config"

const startServer = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }: any) => ({ req })
    });

    await createConnection();
      
    const app = express();

    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: false
        })
    )
      
    server.applyMiddleware({ app ,
      cors: {
          credentials: true,
          origin: "http://localhost:3000"
      }
    });
      
      
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer();

