import express from 'express';
import server from "./server/index.js";

const app = express();

await server.start();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
