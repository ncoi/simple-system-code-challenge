import { Card, CardContent, Typography, Link, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { GithubRepo } from "@/app/lib/types";

export default function RepositoryCard({ repo }: { repo: GithubRepo }) {
  return (
    <Card
      sx={{
        my: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" component="h2">
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              {repo.name}
            </Link>
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body1" color="text.secondary">
              {repo.stargazers_count}
            </Typography>
            <StarIcon aria-label="stars" />
          </Stack>
        </Stack>
        {repo.description && (
          <Typography variant="body1" color="text.secondary">
            {repo.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
