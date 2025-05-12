import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //! 1.- load authenticated user
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  // ! 3 if No user redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },

    [isAuthenticated, isLoading, navigate]
  );

  // ! 2 while loading show spinner
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  // ! if thereis a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
