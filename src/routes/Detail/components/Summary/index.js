/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { 
  Image, 
  ListItem, 
  OrderedList, 
  Skeleton, 
  Table, 
  Tbody, 
  Td, 
  Tr 
} from "@chakra-ui/react"
import { jsx, css } from '@emotion/react';

import PokemonType from "../../../../components/PokemonType";

import { getPokemonNumber } from "../../../../utils";

const IMG_STYLE_PROPS = {
  mb:"8px",
  border:"1px solid #CBD5E0",
  borderRadius:"8px",
  htmlHeight:"96px",
  htmlWidth:"96px",
};

const Summary = ({loading, data}) => {
  const summaryStyles = css({
    display: 'grid',
    gridTemplateColumns: '96px auto',
    gap: '8px'
  });

  const imageWrapperStyles = css({
    display: 'flex',
    flexDirection: 'column'
  });

  
  const { 
    abilities, 
    base_experience,
    height,
    id,
    name = '', 
    sprites,
    types,
    weight 
  } = data || {};

  const tableContent = [
    {
      label: 'Number',
      value: getPokemonNumber(id)
    },
    {
      label: 'Types',
      value: types?.map((item, i) => (
        <PokemonType key={i} type={item.type.name} />
      ))
    },
    {
      label: 'Height',
      value: height
    },
    {
      label: 'Weight',
      value: weight
    },
    {
      label: 'Abilities',
      value: (
        <OrderedList textTransform="capitalize">
          {abilities?.map((item, i) => (
            <ListItem key={i}>{item.ability.name}</ListItem>
          ))}
        </OrderedList>
      )
    },
    {
      label: 'Base exp.',
      value: base_experience
    }
  ];

  const imgFallback = (
    
      <Skeleton 
        height="96px" 
        width="96px" 
        mb="8px" 
        borderRadius="8px" 
      />
  );

  return (
    <div css={summaryStyles}>
      <div css={imageWrapperStyles}>
        <Image 
          src={sprites?.front_default} 
          alt={name}
          fallback={imgFallback}
          {...IMG_STYLE_PROPS}
        />
        {sprites?.back_default && (
          <Image 
            src={sprites?.back_default} 
            alt={name} 
            fallback={imgFallback}
            {...IMG_STYLE_PROPS}
          />
        )}
      </div>
      <Table>
        <Tbody>
          {tableContent.map((content, i) => (
            <Tr key={i}>
              <Td maxWidth="84px">{content.label}</Td>
              <Td>
                {loading ? (
                  <Skeleton width="60px" height="14px"/>
                ) : (<>{content.value}</>)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default Summary;