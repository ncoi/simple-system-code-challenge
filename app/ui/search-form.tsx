import {
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Grid2 as Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validationError: boolean;
}

export default function SearchForm({
  username,
  setUsername,
  handleSubmit,
  validationError,
}: SearchFormProps) {
  return (
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
  );
}
