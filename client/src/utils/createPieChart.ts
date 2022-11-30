export const createPieChart = (entries: Entry[]) => {
  const cities: Set<string> = new Set(); //using Set because don't want duplicates
  const entryCopy = [...entries];
  entryCopy.sort((a, b) => {
    var cityA = a.address.city.toLowerCase(),
      cityB = b.address.city.toLowerCase();
    if (cityA < cityB) return -1;
    if (cityA > cityB) return 1;
    return 0;
  });
  entryCopy.forEach((entry) => {
    cities.add(entry.address.city);
  });

  const series: number[] = [];

  cities.forEach((city) => {
    series.push(entryCopy.filter((entry) => entry.address.city === city).length);
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
