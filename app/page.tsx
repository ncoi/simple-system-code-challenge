"use client";

import { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Grid2 as Grid,
  Container,
  Typography,
  Skeleton,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UserAccordion from "@/app/ui/user-accordion";
import { useGithubUsers } from "@/app/lib/hooks";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormControl variant="standard" fullWidth>
              <TextField
                error={validationError}
                label="Enter Username"
                size="small"
                id="username"
                variant="standard"
                aria-describedby="username-helper-text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {username && (
                          <IconButton
                            onClick={() => setUsername("")}
                            data-testid="clearBtn"
                          >
                            <ClearIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {validationError && (
                <FormHelperText id="username-helper-text" error>
                  Username is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="standard" fullWidth>
              <Button size="large" variant="outlined" type="submit" fullWidth>
                Search
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
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
        userList.map((user) => (
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
