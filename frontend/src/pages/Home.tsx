import React from "react";
import { useForm } from "react-hook-form";
import { useCurrentUserQuery } from "../generated/graphql";

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const { data, loading } = useCurrentUserQuery();
  let current_user_text: string = "";
  if (data?.currentUser) {
    current_user_text = `You are logged in as: ${data.currentUser.displayName} with mail ${data.currentUser.mail} and username ${data.currentUser.username}`;
  }
  const { register } = useForm();
  return (
    <div>
      <h1>HOMEPAGE</h1>
      <p>{current_user_text}</p>
    </div>
  );
};
