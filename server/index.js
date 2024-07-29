import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../graphql/typeDefs.js';
import resolvers from '../graphql/resolvers.js';
import { adminDirective } from '../directives/adminDirective.js';
import { getUserFromToken } from '../utils/auth.js';

const { adminDirectiveTypeDefs, adminDirectiveTransformer } = adminDirective('admin');

const schema = makeExecutableSchema({
    typeDefs: [adminDirectiveTypeDefs, typeDefs],
    resolvers,
});

const schemaWithDirectives = adminDirectiveTransformer(schema);

const server = new ApolloServer({
    schema: schemaWithDirectives,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = await getUserFromToken(token);
        return { user };
    },
});

export default server;
