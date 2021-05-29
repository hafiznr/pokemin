import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          url
          name
        }
        is_hidden
        slot
      }
      base_experience
      height
      id
      moves {
        move {
          url
          name
        }
      }
      name
      species {
        url
        name
      }
      sprites {
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      types {
        slot
        type {
          url
          name
        }
      }
      weight
      status
      message
    }
  }
`;