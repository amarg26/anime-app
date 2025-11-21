import { gql } from '@apollo/client';

// Replace with your actual schema; this is a placeholder
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      image
      price
      description
    }
  }
`;
