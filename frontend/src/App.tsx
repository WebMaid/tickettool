import React, { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import { changeThemeTo } from "./helpers/ThemeHelper";
import { Routing } from "./Routes";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3001/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  changeThemeTo("light");

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routing />;
};
