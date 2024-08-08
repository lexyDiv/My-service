export const getHouseRents = ({ locationId, houseId, rentId, locations }) => {
  const location = locations.find((loc) => loc.id === locationId);
  if (location) {
    const house = location.Houses.find((hs) => hs.id === houseId);
    if (house) {
      return house.Rents.filter((rent) => rent.id !== rentId);
    }
  }
  return [];
};
