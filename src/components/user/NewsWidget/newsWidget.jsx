import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  WidgetCard,
  WidgetHeader,
} from "../../../pages/user/Dashboard/dashboardStyles";
import { ActivityItem } from "./newsWidgetStyles";

const NewsWidget = ({ title, icon, data }) => (
  <WidgetCard>
    <WidgetHeader>
      <FontAwesomeIcon icon={icon} />
      <h2>{title}</h2>
    </WidgetHeader>
    {data.map((activity, index) => (
      <ActivityItem key={index}>
        <h3>{activity.title}</h3>
        <p>{activity.summary}</p>
        <p>{activity.date}</p>
      </ActivityItem>
    ))}
  </WidgetCard>
);

export default NewsWidget;
