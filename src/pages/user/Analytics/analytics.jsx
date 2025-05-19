import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { ThemeContext } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  faCar,
  faSearch,
  faHeart,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import MetricCard from "../../../components/user/MetricCard/metricCard";
import ChartCard from "../../../components/user/ChartCard/chartCard";
import ActivityTable from "../../../components/user/ActivityTable/activityTable";
import { userAnalyticsData } from "../../../data/user/analyticsData";
import {
  AnalyticsContainer,
  MetricsGrid,
  ChartsGrid,
  FilterContainer,
  FilterSelect,
  DateInputsWrapper,
  DateInput,
  ApplyButton,
  NoDataMessage,
} from "./analyticsStyles";

const Analytics = () => {
  const [filterType, setFilterType] = useState("7days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState({
    totalSearches: 0,
    savedCars: 0,
    testDrives: 0,
    comparisons: 0,
    searchHistory: [],
    preferredTypes: [],
    userActivities: [],
  });
  const theme = useContext(ThemeContext);

  const isDateInRange = useCallback((dateStr, start, end) => {
    const date = new Date(dateStr.split(" ")[0]);
    const startDate = new Date(start);
    const endDate = new Date(end);

    date.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return date >= startDate && date <= endDate;
  }, []);

  const handleDateFilter = useCallback(() => {
    let startDateStr, endDateStr;

    if (filterType === "custom" && startDate && endDate) {
      startDateStr = startDate;
      endDateStr = endDate;
    } else {
      const today = new Date();
      const start = new Date();

      if (filterType === "7days") {
        start.setDate(today.getDate() - 6);
      } else if (filterType === "30days") {
        start.setDate(today.getDate() - 29);
      }

      startDateStr = start.toISOString().split("T")[0];
      endDateStr = today.toISOString().split("T")[0];
    }

    const baseData =
      filterType === "custom"
        ? userAnalyticsData["30days"]
        : userAnalyticsData[filterType];

    if (!baseData) {
      setData({
        totalSearches: 0,
        savedCars: 0,
        testDrives: 0,
        comparisons: 0,
        searchHistory: [],
        preferredTypes: [],
        userActivities: [],
      });
      return;
    }

    const filteredHistory = baseData.searchHistory.filter((item) =>
      isDateInRange(item.date, startDateStr, endDateStr)
    );

    const filteredActivities = baseData.userActivities.filter((item) =>
      isDateInRange(item.date, startDateStr, endDateStr)
    );

    const savedCars = filteredActivities.filter(
      (a) => a.activity === "Saved Car"
    ).length;
    const testDrives = filteredActivities.filter(
      (a) => a.activity === "Test Drive"
    ).length;
    const comparisons = filteredActivities.filter(
      (a) => a.activity === "Car Comparison"
    ).length;
    const totalSearches = filteredHistory.reduce(
      (sum, item) => sum + item.searches,
      0
    );

    const typeCounts = filteredActivities.reduce((acc, activity) => {
      if (activity.carType) {
        acc[activity.carType] = (acc[activity.carType] || 0) + 1;
      }
      return acc;
    }, {});

    const total = Object.values(typeCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    const preferredTypes = Object.entries(typeCounts)
      .map(([name, count]) => ({
        name,
        value: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    setData({
      totalSearches,
      savedCars,
      testDrives,
      comparisons,
      searchHistory: filteredHistory,
      preferredTypes,
      userActivities: filteredActivities.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    });
  }, [filterType, startDate, endDate, isDateInRange]);

  const handleFilterChange = (e) => {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    if (newFilterType !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  useEffect(() => {
    if (filterType !== "custom") {
      handleDateFilter();
    }
  }, [filterType, handleDateFilter]);

  const isDateRangeValid = useMemo(
    () =>
      filterType === "custom"
        ? startDate && endDate && new Date(startDate) <= new Date(endDate)
        : true,
    [filterType, startDate, endDate]
  );

  const metrics = [
    {
      icon: faSearch,
      title: "My Searches",
      value: data.totalSearches,
      delay: "0.1s",
    },
    {
      icon: faHeart,
      title: "Saved Cars",
      value: data.savedCars,
      delay: "0.2s",
    },
    {
      icon: faCar,
      title: "Test Drives",
      value: data.testDrives,
      delay: "0.3s",
    },
    {
      icon: faRoad,
      title: "Comparisons",
      value: data.comparisons,
      delay: "0.4s",
    },
  ];

  const handleExport = useCallback((chartType) => {
    console.log(`Exporting ${chartType} data...`);
  }, []);

  return (
    <AnalyticsContainer>
      <FilterContainer>
        <FilterSelect value={filterType} onChange={handleFilterChange}>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </FilterSelect>

        {filterType === "custom" && (
          <DateInputsWrapper>
            <DateInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate || undefined}
            />
            <DateInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
            <ApplyButton
              onClick={handleDateFilter}
              disabled={!isDateRangeValid}
            >
              Apply
            </ApplyButton>
          </DateInputsWrapper>
        )}
      </FilterContainer>

      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            title={metric.title}
            value={metric.value}
            delay={metric.delay}
          />
        ))}
      </MetricsGrid>

      <ChartsGrid>
        <ChartCard
          title="My Car Search History"
          chart={
            data.searchHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.searchHistory}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <YAxis
                    tick={{ fill: theme.colors.text }}
                    tickFormatter={(value) => value.toLocaleString()}
                    width={30}
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: "12px" }}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.colors.text }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    padding={{ left: 0, right: 0 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: theme.colors.background,
                      border: `1px solid ${theme.colors.glass}`,
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [value.toLocaleString(), "Searches"]}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.colors.glass}
                  />
                  <Line
                    type="monotone"
                    dataKey="searches"
                    stroke={theme.colors.primary}
                    strokeWidth={2}
                    dot={{ fill: theme.colors.primary, r: 4 }}
                    activeDot={{ r: 6, fill: theme.colors.accent }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <NoDataMessage>
                No search history available for the selected period
              </NoDataMessage>
            )
          }
          delay="0.5s"
          onExport={() => handleExport("searchHistory")}
        />

        <ChartCard
          title="My Preferred Car Types"
          chart={
            data.preferredTypes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.preferredTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={true}
                  >
                    {data.preferredTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            theme.colors.primary,
                            theme.colors.secondary,
                            theme.colors.accent,
                            theme.colors.glassDark,
                            theme.colors.glass,
                          ][index % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${value.toFixed(1)}%`,
                      "Preference",
                    ]}
                    contentStyle={{
                      background: theme.colors.background,
                      border: `1px solid ${theme.colors.glass}`,
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span style={{ color: theme.colors.text }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <NoDataMessage>
                No preferred car types data available for the selected period
              </NoDataMessage>
            )
          }
          delay="0.6s"
          onExport={() => handleExport("preferredTypes")}
        />
      </ChartsGrid>

      <ActivityTable activities={data.userActivities} />
    </AnalyticsContainer>
  );
};

export default Analytics;
