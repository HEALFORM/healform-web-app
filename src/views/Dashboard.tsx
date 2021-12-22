import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import {GridColumn, GridRow} from "emotion-flex-grid";
import axios from "axios";
import {Appointment} from "../interfaces/Appointment";
import {Headline} from "@healform/ui-library";

const DashboardView: React.FC = () => {
  const { user, logout } = useAuth0();
  const [ appointments, setAppointments ] = useState<Appointment[]>([]);

  useEffect(() => {
    getAppointmentByUser(user?.email);
  }, [])

  const getAppointmentByUser = (user: string | undefined) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}` + `/api/user/` + user + `/appointments`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <GridRow>
        <GridColumn>
          <Headline as={"h1"}>Guten Abend</Headline>
          <h2>{user?.name}</h2>
          <ul>
            {appointments.map((appointment) =>
              <li key={appointment.id}>
                {appointment.datetime}
              </li>
            )}
          </ul>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </GridColumn>
      </GridRow>
    </>
  );
};

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
});
