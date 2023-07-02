import { Typography } from '@mui/material';

function Heading({ title }: { title: string }) {
  return (
    <Typography variant="h5" component="h1">
      {title}
    </Typography>
  );
}

export default Heading;
