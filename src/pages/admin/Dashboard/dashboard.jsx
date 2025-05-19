import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faChartLine,
  faUsers,
  faTags,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  DashboardWrapper,
  ContentHeader,
  HeaderTitle,
  DashboardGrid,
  Card,
  CardHeader,
  CardContent,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  CarTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  PaginationControls,
  TableWrapper,
  UserGrid,
  UserCard,
  ActionButtonsWrapper,
  BrandGrid,
  BrandCard,
  BrandLogo,
  BrandInfo,
  GrowthSection,
  ChartContainer,
} from "./dashboardStyles";
import { carData } from "../../../data/admin/dashboardData";

const CarDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(carData.length / itemsPerPage);

  const paginatedCars = carData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const brands = [
    { id: 1, name: "Tesla", count: 48 },
    { id: 2, name: "BMW", count: 42 },
    { id: 3, name: "Audi", count: 35 },
    { id: 4, name: "Mercedes", count: 31 },
    { id: 5, name: "Toyota", count: 28 },
    { id: 6, name: "Honda", count: 26 },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", cars: 3 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", cars: 1 },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", cars: 2 },
    { id: 4, name: "Emily Wilson", email: "emily@example.com", cars: 5 },
  ];

  const growthData = [
    { period: "Jan", users: 250, listings: 120 },
    { period: "Feb", users: 320, listings: 150 },
    { period: "Mar", users: 380, listings: 190 },
    { period: "Apr", users: 450, listings: 210 },
    { period: "May", users: 520, listings: 240 },
    { period: "Jun", users: 580, listings: 270 },
  ];

  return (
    <DashboardWrapper>
      <ContentHeader>
        <HeaderTitle>
          <h1>CarGenie Dashboard</h1>
          <p>Overview of your car listings, brands, users, and growth</p>
        </HeaderTitle>
      </ContentHeader>

      <StatsGrid>
        <StatItem>
          <FontAwesomeIcon icon={faCarSide} />
          <StatValue>384</StatValue>
          <StatLabel>Total Cars</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faTags} />
          <StatValue>28</StatValue>
          <StatLabel>Brands</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faUsers} />
          <StatValue>2,954</StatValue>
          <StatLabel>Active Users</StatLabel>
        </StatItem>
        <StatItem>
          <FontAwesomeIcon icon={faChartLine} />
          <StatValue>+24%</StatValue>
          <StatLabel>Monthly Growth</StatLabel>
        </StatItem>
      </StatsGrid>

      <DashboardGrid>
        <Card gridArea="cars">
          <CardHeader>
            <h2>Car Listings</h2>
          </CardHeader>
          <CardContent>
            <TableWrapper>
              <CarTable>
                <thead>
                  <TableRow>
                    <TableHeader>Car Model</TableHeader>
                    <TableHeader>Brand</TableHeader>
                    <TableHeader>Year</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {paginatedCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>{car.model}</TableCell>
                      <TableCell>{car.make}</TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>
                        <ActionButtonsWrapper>
                          <ActionButton primary title="Edit">
                            <FontAwesomeIcon icon={faEdit} />
                          </ActionButton>
                          <ActionButton title="Delete">
                            <FontAwesomeIcon icon={faTrash} />
                          </ActionButton>
                        </ActionButtonsWrapper>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </CarTable>
            </TableWrapper>

            <PaginationControls>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </PaginationControls>
          </CardContent>
        </Card>

        <Card gridArea="brands">
          <CardHeader>
            <h2>Top Brands</h2>
          </CardHeader>
          <CardContent>
            <BrandGrid>
              {brands.map((brand) => (
                <BrandCard key={brand.id}>
                  <BrandLogo>{brand.name.charAt(0)}</BrandLogo>
                  <BrandInfo>
                    <h3>{brand.name}</h3>
                    <p>{brand.count} cars</p>
                  </BrandInfo>
                </BrandCard>
              ))}
            </BrandGrid>
          </CardContent>
        </Card>

        <Card gridArea="users">
          <CardHeader>
            <h2>Recent Users</h2>
          </CardHeader>
          <CardContent>
            <UserGrid>
              {users.map((user) => (
                <UserCard key={user.id}>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className="car-count">{user.cars} car listings</span>
                  </div>
                </UserCard>
              ))}
            </UserGrid>
          </CardContent>
        </Card>

        <Card gridArea="growth">
          <CardHeader>
            <h2>Growth Analytics</h2>
          </CardHeader>
          <CardContent>
            <GrowthSection>
              <ChartContainer>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {growthData.map((item, index) => (
                      <div className="chart-bar-group" key={index}>
                        <div
                          className="chart-bar users"
                          style={{ height: `${item.users / 6}px` }}
                          data-value={item.users}
                        ></div>
                        <div
                          className="chart-bar listings"
                          style={{ height: `${item.listings / 3}px` }}
                          data-value={item.listings}
                        ></div>
                        <div className="period-label">{item.period}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color users"></span>
                      <span>Users</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color listings"></span>
                      <span>Listings</span>
                    </div>
                  </div>
                </div>
              </ChartContainer>
              <div className="growth-highlights">
                <div className="highlight">
                  <h4>User Growth</h4>
                  <p>+18.5% since last month</p>
                </div>
                <div className="highlight">
                  <h4>Listing Growth</h4>
                  <p>+12.3% since last month</p>
                </div>
              </div>
            </GrowthSection>
          </CardContent>
        </Card>
      </DashboardGrid>
    </DashboardWrapper>
  );
};

export default CarDashboard;
