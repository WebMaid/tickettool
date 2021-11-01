import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFindAllTicketsQuery,
  useNewTicketCreatedSubscription,
} from "../../generated/graphql";
import { formatDateTime } from "../../helpers/DateHelper";
import { InputSizeEnum } from "../../objects/InputSizeEnum";
import { TextInput } from "../main/TextInput";

interface Props {}

export const TicketTableComponent: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [showFilter, setShowFilter] = useState(false);
  const ticketsQuery = useFindAllTicketsQuery({ variables: { count: 50 } });
  const newTicketSubscription = useNewTicketCreatedSubscription();
  useEffect(() => {
    if (newTicketSubscription)
      console.log(newTicketSubscription.data?.ticketCreated?.ticket_id);
  }, [newTicketSubscription.data]);
  if (!newTicketSubscription.loading) {
    console.log(newTicketSubscription);
  }
  return (
    <div className="table-responsive">
      <table className="table table-md">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Service</th>
            <th scope="col">Kurzbeschreibung</th>
            <th scope="col">Zuständigkeit</th>
            <th scope="col">Aussteller</th>
            <th scope="col">Gruppe</th>
            <th scope="col">Erstellungdatum</th>
            <th scope="col">Abschlussdatum</th>
          </tr>
        </thead>
        <tbody>
          {ticketsQuery.data?.findAllTickets.tickets &&
            ticketsQuery.data.findAllTickets.tickets.map((ti) => (
              <tr key={ti.id}>
                <th scope="row" className="numeric">
                  {ti.ticket_id}
                </th>
                <td className={`status-${ti.status}`}>
                  <span>{t(ti.status)}</span>
                </td>
                <td>{t(ti.type)}</td>
                <td>
                  <a href={`/service/${ti.service.id}`}>{ti.service.name}</a>
                </td>
                <td>{ti.short_description}</td>
                <td>
                  {ti.responsible_user ? (
                    <a
                      href={`/profile/${ti.responsible_user.username}`}
                    >{`${ti.responsible_user.displayName}, ${ti.responsible_department.name}`}</a>
                  ) : (
                    `${ti.responsible_department.name}`
                  )}
                </td>
                <td>
                  {ti.issuer ? (
                    <a
                      href={`/profile/${ti.issuer.username}`}
                    >{`${ti.issuer.displayName}, ${ti.issuer_department.name}`}</a>
                  ) : (
                    `${ti.issuer_department.name}`
                  )}
                </td>
                <td>{ti.group?.id}</td>
                <td className="numeric">{formatDateTime(ti.created_at, t)}</td>
                <td className="numeric">{formatDateTime(ti.closed_at, t)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
