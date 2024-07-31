export const dataJsonFiles = import.meta.glob("../dataJson/*.json", {
  eager: true,
});
export const mapDataFiles = import.meta.glob("./mapData/*.json", {
  eager: true,
});
