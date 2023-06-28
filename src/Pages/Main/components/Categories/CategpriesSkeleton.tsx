import { Skeleton } from '@mui/material';

function CategoriesSkeleton() {
  return (
    <div className="categories">
      <Skeleton variant="rounded" width={60} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" width={60} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" width={60} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" width={60} sx={{ fontSize: '2rem' }} />
    </div>
  );
}

export default CategoriesSkeleton;
