import React from "react";
import { TicketTableComponent } from "../../components/custom/TicketTableComponent";
import { TitleComponent } from "../../components/main/Title";

interface Props {}

export const TicketIndexPage: React.FC<Props> = () => {
  return (
    <div>
      <div className="col-md-10 offset-md-1">
        <TitleComponent content="Tickets" />
        <TicketTableComponent />
      </div>
    </div>
  );
};
