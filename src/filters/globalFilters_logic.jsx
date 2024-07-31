export function filterNombre(nombre, textSearch) {
  if (textSearch === "" || textSearch.length < 3) return true;
  const searchRegex = new RegExp(textSearch, "i");
  return searchRegex.test(nombre);
}

export function filterLocalidad(localidad, selectedOne) {
  if (selectedOne === "all") return true;

  return localidad.toLowerCase() === selectedOne.toLowerCase();
}

export function filterDepartamento(departamento, selectedTwo) {
  if (selectedTwo === "all") return true;

  if (!departamento || !selectedTwo) {
    return null;
  }

  return departamento.toLowerCase() === selectedTwo.toLowerCase();
}

export function filterLegend(legendOp, selectedOption) {
  return selectedOption.includes(legendOp);
}

/* module.exports = {
  filterNombre,
  filterLocalidad,
  filterDepartamento,
  filterLegend,
}; */
