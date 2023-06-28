import { Skeleton } from '@mui/material';

function FoodsSkeleton() {
  return (
    <div className="foods">
      <Skeleton variant="text" width={200} sx={{ fontSize: '3rem' }} />
      <div className="foods-container">
        <Skeleton variant="rounded" width={140} height={160} sx={{ margin: '0 auto' }} />
        <Skeleton variant="rounded" width={140} height={160} sx={{ margin: '0 auto' }} />
        <Skeleton
          sx={{ margin: '0 auto', marginTop: 2 }}
          variant="rounded"
          width={140}
          height={160}
        />
        <Skeleton
          sx={{ margin: '0 auto', marginTop: 2 }}
          variant="rounded"
          width={140}
          height={160}
        />
        <Skeleton
          sx={{ margin: '0 auto', marginTop: 2 }}
          variant="rounded"
          width={140}
          height={160}
        />
        <Skeleton
          sx={{ margin: '0 auto', marginTop: 2 }}
          variant="rounded"
          width={140}
          height={160}
        />
      </div>
    </div>
  );
}

export default FoodsSkeleton;
