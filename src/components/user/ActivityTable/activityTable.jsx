import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination/pagination";
import {
  TableWrapper,
  Table,
  TimeStamp,
  ActivityType,
  CarInfo,
  ActivityDetail,
  LoadingSpinner,
  NoDataMessage,
} from "./activityTableStyles";

const ITEMS_PER_PAGE = 5;

const ActivityTable = ({ activities = [], isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <TableWrapper>
        <LoadingSpinner>
          <FontAwesomeIcon icon={faSpinner} spin />
          Loading activities...
        </LoadingSpinner>
      </TableWrapper>
    );
  }

  if (!activities.length) {
    return (
      <TableWrapper>
        <NoDataMessage>No activities found</NoDataMessage>
      </TableWrapper>
    );
  }

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentActivities = activities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Activity</th>
            <th>Car Model</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentActivities.map((activity, index) => (
            <tr key={index}>
              <td>
                <TimeStamp>{formatDate(activity.date)}</TimeStamp>
              </td>
              <td>
                <ActivityType type={activity.activity.toLowerCase()}>
                  {activity.activity}
                </ActivityType>
              </td>
              <td>
                <CarInfo>{activity.carModel}</CarInfo>
              </td>
              <td>
                <ActivityDetail>{activity.details}</ActivityDetail>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </TableWrapper>
  );
};

export default ActivityTable;
