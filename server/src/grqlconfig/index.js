import {getRoot} from './rootValue'
import {rootSchema} from './rootSchema'

import {graphqlHTTP} from 'express-graphql';

export const grqlConfig = graphqlHTTP(async (req, res, graphQLParams) => ({
  schema: rootSchema,
  rootValue: await getRoot(req, res, graphQLParams),
  graphiql: true,
}))