const generatePastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
};

const generatePastDateTime = (daysAgo, hour, minute) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString().replace("T", " ").split(".")[0];
};

const lastWeekData = [
  { date: generatePastDate(0), searches: 25 },
  { date: generatePastDate(1), searches: 18 },
  { date: generatePastDate(2), searches: 22 },
  { date: generatePastDate(3), searches: 15 },
  { date: generatePastDate(4), searches: 20 },
  { date: generatePastDate(5), searches: 17 },
  { date: generatePastDate(6), searches: 23 },
];

const lastMonthData = [
  ...lastWeekData,
  { date: generatePastDate(7), searches: 19 },
  { date: generatePastDate(8), searches: 21 },
  { date: generatePastDate(9), searches: 16 },
  { date: generatePastDate(10), searches: 24 },
  { date: generatePastDate(11), searches: 18 },
  { date: generatePastDate(12), searches: 20 },
  { date: generatePastDate(13), searches: 22 },
  { date: generatePastDate(14), searches: 17 },
  { date: generatePastDate(15), searches: 19 },
  { date: generatePastDate(16), searches: 23 },
  { date: generatePastDate(17), searches: 21 },
  { date: generatePastDate(18), searches: 18 },
  { date: generatePastDate(19), searches: 20 },
  { date: generatePastDate(20), searches: 24 },
  { date: generatePastDate(21), searches: 19 },
  { date: generatePastDate(22), searches: 22 },
  { date: generatePastDate(23), searches: 18 },
  { date: generatePastDate(24), searches: 21 },
  { date: generatePastDate(25), searches: 23 },
  { date: generatePastDate(26), searches: 20 },
  { date: generatePastDate(27), searches: 19 },
  { date: generatePastDate(28), searches: 22 },
  { date: generatePastDate(29), searches: 21 },
];

const sevenDaysActivities = [
  {
    date: generatePastDateTime(0, 14, 30),
    activity: "Saved Car",
    carModel: "Tesla Model 3",
    details: "Added to wishlist for future consideration",
    carType: "Electric",
  },
  {
    date: generatePastDateTime(1, 11, 20),
    activity: "Test Drive",
    carModel: "BMW X5",
    details: "Scheduled test drive for next week",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(2, 15, 45),
    activity: "Car Comparison",
    carModel: "Honda Civic vs Toyota Corolla",
    details: "Compared features, prices, and specifications",
    carType: "Sedan",
  },
  {
    date: generatePastDateTime(3, 9, 30),
    activity: "Saved Car",
    carModel: "Mercedes-Benz C-Class",
    details: "Saved for price comparison",
    carType: "Luxury",
  },
  {
    date: generatePastDateTime(4, 16, 15),
    activity: "Test Drive",
    carModel: "Audi Q7",
    details: "Completed test drive - very satisfied",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(5, 13, 20),
    activity: "Car Comparison",
    carModel: "Ford Mustang vs Chevrolet Camaro",
    details: "Compared performance specifications",
    carType: "Sports",
  },
  {
    date: generatePastDateTime(6, 10, 45),
    activity: "Saved Car",
    carModel: "Porsche 911",
    details: "Added to favorites list",
    carType: "Sports",
  },
];

const thirtyDaysActivities = [
  ...sevenDaysActivities,
  {
    date: generatePastDateTime(8, 14, 30),
    activity: "Test Drive",
    carModel: "Hyundai Tucson",
    details: "Test drive completed successfully",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(10, 11, 15),
    activity: "Car Comparison",
    carModel: "Tesla Model S vs Porsche Taycan",
    details: "Compared electric vehicle features",
    carType: "Electric",
  },
  {
    date: generatePastDateTime(12, 9, 30),
    activity: "Saved Car",
    carModel: "Volkswagen Golf",
    details: "Saved for future reference",
    carType: "Hatchback",
  },
  {
    date: generatePastDateTime(15, 13, 45),
    activity: "Test Drive",
    carModel: "Range Rover Sport",
    details: "Scheduled test drive for next month",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(18, 10, 20),
    activity: "Car Comparison",
    carModel: "BMW 3 Series vs Audi A4",
    details: "Compared luxury sedan features",
    carType: "Luxury",
  },
  {
    date: generatePastDateTime(20, 15, 30),
    activity: "Saved Car",
    carModel: "Lexus RX",
    details: "Added to wishlist",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(22, 12, 45),
    activity: "Test Drive",
    carModel: "Mazda CX-5",
    details: "Test drive completed",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(25, 14, 15),
    activity: "Car Comparison",
    carModel: "Mercedes-Benz GLE vs BMW X5",
    details: "Compared luxury SUV features",
    carType: "SUV",
  },
  {
    date: generatePastDateTime(28, 11, 30),
    activity: "Saved Car",
    carModel: "Audi e-tron",
    details: "Saved for future purchase consideration",
    carType: "Electric",
  },
];

export const userAnalyticsData = {
  "7days": {
    totalSearches: lastWeekData.reduce((sum, item) => sum + item.searches, 0),
    savedCars: sevenDaysActivities.filter((a) => a.activity === "Saved Car")
      .length,
    testDrives: sevenDaysActivities.filter((a) => a.activity === "Test Drive")
      .length,
    comparisons: sevenDaysActivities.filter(
      (a) => a.activity === "Car Comparison"
    ).length,
    searchHistory: lastWeekData,
    preferredTypes: [
      { name: "SUV", value: 35 },
      { name: "Sedan", value: 25 },
      { name: "Electric", value: 20 },
      { name: "Luxury", value: 15 },
      { name: "Sports", value: 5 },
    ],
    userActivities: sevenDaysActivities,
  },
  "30days": {
    totalSearches: lastMonthData.reduce((sum, item) => sum + item.searches, 0),
    savedCars: thirtyDaysActivities.filter((a) => a.activity === "Saved Car")
      .length,
    testDrives: thirtyDaysActivities.filter((a) => a.activity === "Test Drive")
      .length,
    comparisons: thirtyDaysActivities.filter(
      (a) => a.activity === "Car Comparison"
    ).length,
    searchHistory: lastMonthData,
    preferredTypes: [
      { name: "SUV", value: 40 },
      { name: "Electric", value: 20 },
      { name: "Luxury", value: 15 },
      { name: "Sedan", value: 15 },
      { name: "Sports", value: 5 },
      { name: "Hatchback", value: 5 },
    ],
    userActivities: thirtyDaysActivities,
  },
};

export const isDateInRange = (dateStr, startDate, endDate) => {
  const date = new Date(dateStr);
  return date >= new Date(startDate) && date <= new Date(endDate);
};

export const filterDataByDateRange = (data, startDate, endDate) => {
  return {
    ...data,
    searchHistory: data.searchHistory.filter((item) =>
      isDateInRange(item.date, startDate, endDate)
    ),
    userActivities: data.userActivities.filter((item) =>
      isDateInRange(item.date, startDate, endDate)
    ),
  };
};
