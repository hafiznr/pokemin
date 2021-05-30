import { Box, Skeleton, Tag } from "@chakra-ui/react";

const Moves = ({
  loading,
  moves
}) => {
  return (
    <div>
      <Box fontSize="2xl" mb="4px">Moves</Box>
      {loading ? (
        <Skeleton 
          height="100px" 
          data-testid="moves-skeleton"
        />
      ) : (
        <Box 
          display="flex" 
          flexWrap="wrap"
          overflow="scroll"
          height="100px"
          bgColor="gray.100"
          borderRadius="8px"
          borderColor="gray.100"
          borderWidth="4px"
          data-testid="moves-container"
        >
          {moves?.map((item, i) => (
            <Tag 
              key={i}
              size="lg"
              margin="0 4px 4px 0"
              bgColor="white"
            >
              {item.move.name}
            </Tag>
          ))}
        </Box>
      )}
    </div>
  )
}

export default Moves;