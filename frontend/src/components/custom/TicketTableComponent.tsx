import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TicketFilter,
  TicketInclude,
  useFindTicketsMutation,
} from "../../generated/graphql";
import { formatDateTime } from "../../helpers/DateHelper";
import { TicketTableData } from "../../objects/TicketTableData";

interface Props {}

export const TicketTableComponent: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const defaultTicketInclude: TicketInclude = {
    short_description: true,
    description: true,
    responsible_user: {
      displayName: true,
    },
    responsible_department: {
      name: true,
    },
    issuer_department: {
      name: true,
    },
  };
  const [includeInSearch, setIncludeInSearch] = useState(defaultTicketInclude);
  const defaultFilter: TicketFilter = {
    id: [{ value: "ff-cc-00" }],
    responsible_user: {
      displayName: [{ value: "Meier L", comparasion: "like" }],
    },
  };
  const defaltTickets: TicketTableData[] = [];
  const [ticketData, setTicketData] = useState(defaltTickets);
  const [filters, setFilters] = useState(defaultFilter);
  const [showFilter, setShowFilter] = useState(false);
  const [findAll] = useFindTicketsMutation();

  const submitSearch = async (e: FormEvent) => {
    e.preventDefault();
    const result = await findAll({
      variables: {
        count: 50,
        search: { value: search, include: includeInSearch },
        filter: filters,
      },
    });
    const ticketResults = result.data?.findTickets.tickets;
    if (ticketResults != null) {
      setTicketData(ticketResults);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const result = await findAll({
        variables: {
          count: 50,
          search: { value: search, include: includeInSearch },
          filter: filters,
        },
      });
      if (result.data?.findTickets.tickets) {
        setTicketData(result.data.findTickets.tickets);
      }
    }
    fetchData();
  }, []);
  /*const newTicketSubscription = useNewTicketCreatedSubscription();
  useEffect(() => {
    if (newTicketSubscription)
      console.log(newTicketSubscription.data?.ticketCreated?.ticket_id);
  }, [newTicketSubscription.data]);
  if (!newTicketSubscription.loading) {
    console.log(newTicketSubscription);
  }*/
  return (
    <>
      <div className="row">
        <div className="col-3">
          <form onSubmit={submitSearch}>
            <div className="input-group">
              <div className="form-outline">
                <input
                  type="search"
                  id="search"
                  className="form-control"
                  placeholder="Search"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
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
            {ticketData.length >= 1 &&
              ticketData.map((ti) => (
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
                        href={`/profile/${ti.responsible_user?.username}`}
                      >{`${ti.responsible_user.displayName}, ${ti.responsible_department.name}`}</a>
                    ) : (
                      `${ti.responsible_department.name}`
                    )}
                  </td>
                  <td>
                    {ti.issuer ? (
                      <a
                        href={`/profile/${ti.issuer?.username}`}
                      >{`${ti.issuer.displayName}, ${ti.issuer_department.name}`}</a>
                    ) : (
                      `${ti.issuer_department.name}`
                    )}
                  </td>
                  <td>{ti.group?.id}</td>
                  <td className="numeric">
                    {formatDateTime(ti.created_at, t)}
                  </td>
                  <td className="numeric">{formatDateTime(ti.closed_at, t)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
