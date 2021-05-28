export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getPokemonNumber = (id) => {
  return id?.toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false
  });
}