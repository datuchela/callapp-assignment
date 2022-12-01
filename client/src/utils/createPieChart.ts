export const createPieChart = (entries: Entry[]) => {
  // Using Set for cities instead of Array because we don't want duplicates
  const cities: Set<string> = new Set();
  const entriesCopy = [...entries];
  // Sorting entries based on city before looping over it,
  // This way the order of cities stays consistent as data changes.
  entriesCopy.sort((a, b) => {
    var cityA = a.address.city.toLowerCase(),
      cityB = b.address.city.toLowerCase();
    if (cityA < cityB) return -1;
    if (cityA > cityB) return 1;
    return 0;
  });

  entriesCopy.forEach((entry) => {
    cities.add(entry.address.city);
  });

  const series: number[] = [];

  cities.forEach((city) => {
    series.push(entriesCopy.filter((entry) => entry.address.city === city).length);
  });

  const options = {
    labels: Array.from(cities),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return { options, series };
};
