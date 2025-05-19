import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  WidgetCard,
  WidgetHeader,
} from "../../../pages/user/Dashboard/dashboardStyles";
import { ActivityItem } from "./trackingWidgetStyles";

const TrackingWidget = ({ title, icon, data }) => (
  <WidgetCard>
    <WidgetHeader>
      <FontAwesomeIcon icon={icon} />
      <h2>{title}</h2>
    </WidgetHeader>
    {data.map((activity, index) => (
      <ActivityItem key={index}>
        <h3>{activity.name}</h3>
        <p>{activity.location}</p>
        <p>{activity.status}</p>
      </ActivityItem>
    ))}
  </WidgetCard>
);

export default TrackingWidget;
