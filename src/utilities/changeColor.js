import { colorsMapper } from './colorsMapper';

export const changeColor = (pokemon, index) => {
  if (index === 0) return colorsMapper[pokemon?.types[index].type.name];
  else if (index === 1) return colorsMapper[pokemon?.types[index].type.name];
};
