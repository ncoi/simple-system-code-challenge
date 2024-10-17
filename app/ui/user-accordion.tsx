import { useEffect, useState, useRef } from "react";
import { GithubRepo, GithubUser } from "@/app/lib/types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Skeleton,
  Alert,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RepositoryCard from "@/app/ui/repository-card";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import { useGithubRepos } from "@/app/lib/hooks";

interface UserAccordionProps {
  user: GithubUser;
}

export default function UserAccordion({ user }: UserAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const hasFetched = useRef(false);

  const {
    isLoading,
    data: reposList = [],
    error,
    refetch,
  } = useGithubRepos(user.login);

  useEffect(() => {
    if (expanded && !hasFetched.current) {
      refetch();
      hasFetched.current = true;
    }
  }, [expanded, user.login, refetch]);

  return (
    <Accordion
      expanded={expanded}
      onChange={(event, isExpanded) => setExpanded(isExpanded)}
      sx={{ my: 1 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-content-${user.id}`}
        id={`panel-header-${user.id}`}
        data-testid={`accordion-summary-${user.id}`}
      >
        <Typography variant="h6" component="h2">
          {user.login}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading &&
          [1, 2, 3].map((item) => (
            <Box key={item} sx={{ my: 2 }}>
              <Skeleton
                variant="text"
                width="60%"
                height={30}
                role="progressbar"
              />
              <Skeleton variant="rectangular" height={60} role="progressbar" />
            </Box>
          ))}
        {error && (
          <Alert severity="error" icon={<ErrorIcon />}>
            {error.message} || Something went wrong. Please try again later.
          </Alert>
        )}
        {!isLoading &&
          reposList.map((repo: GithubRepo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        {!isLoading && reposList.length === 0 && (
          <Alert severity="info" icon={<InfoIcon />}>
            No repositories found.
          </Alert>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
