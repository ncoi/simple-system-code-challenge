"use client";

import { useState, useEffect } from "react";
import {
  Grid2 as Grid,
  Container,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import UserAccordion from "@/app/ui/user-accordion";
import SearchForm from "@/app/ui/search-form";
import { useGithubUsers } from "@/app/lib/hooks";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import { GithubUser } from "./lib/types";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState(false);

  const {
    isLoading,
    data: userList = [],
    error,
    refetch,
  } = useGithubUsers(searchTerm);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(false);

    const parsedUsername = username.trim();
    if (parsedUsername === "") {
      setValidationError(true);
    } else {
      setSearchTerm(username);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmit}
        validationError={validationError}
      />
      {isLoading && (
        <>
          <Skeleton variant="rounded" height={56} sx={{ my: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ my: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ my: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ my: 1 }} />
        </>
      )}
      {!isLoading && searchTerm && (
        <Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
          Showing users for &quot;{searchTerm}&quot;
        </Typography>
      )}
      {error && (
        <Alert severity="error" icon={<ErrorIcon />}>
          {error.message} || Something went wrong. Please try again later.
        </Alert>
      )}
      {!isLoading &&
        userList.map((user: GithubUser) => (
          <Grid key={user.id} size={{ xs: 12 }}>
            <UserAccordion user={user} />
          </Grid>
        ))}
      {!isLoading && searchTerm && userList.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }} icon={<InfoIcon />}>
          No users found.
        </Alert>
      )}
    </Container>
  );
}
