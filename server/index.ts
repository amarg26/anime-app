import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
};

const typeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    image: String!
    price: Float!
    description: String
  }

  type Query {
    products: [Product!]!
  }
`;

const products: Product[] = [
  { id: '1', name: 'Aurora Headphones', image: 'https://images.unsplash.com/photo-1518441902113-c1d3f2e4a4f0?q=80&w=1200&auto=format&fit=crop', price: 199, description: 'Immersive spatial audio' },
  { id: '2', name: 'Nebula Lamp', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', price: 59, description: 'Ambient RGB desk light' },
  { id: '3', name: 'Comet Keyboard', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', price: 129, description: 'Hot-swappable mechanical' },
  { id: '4', name: 'Orbit Mouse', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop', price: 89, description: 'Ergonomic precision' }
];

const resolvers = {
  Query: {
    products: (): Product[] => products,
  },
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/graphql',
  cors: { origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('GraphQL running at http://localhost:4000/graphql');
});