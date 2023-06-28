/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NotificationSound from '../../assets/notification.mp3';
import { splitNum } from '../../helpers/utils/splitNum';
import { useGetOrdersQuery } from '../../store/services/apiService';
import styles from './Bot.module.css';
import BotStatusContent from './components/BotStatusContent/BotStatusContent';

interface BotProps {
  botStatus: string;
  botPage: number;
}

function Bot({ botStatus, botPage }: BotProps) {
  const [page, setPage] = React.useState(botPage);
  const [ordersCount, setOrdersCount] = React.useState<number>(0);
  const audioPlayer = React.useRef(null);

  const { data: orders, isLoading } = useGetOrdersQuery(
    {
      take: 10,
      page,
      status: botStatus,
    },
    { pollingInterval: 5000 }
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Имя',
      width: 100,
      editable: false,
      renderCell: (params: any) => <div>{params?.row?.member?.full_name}</div>,
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      width: 130,
      editable: false,
      renderCell: (params: any) => <div>{params?.row?.member?.phone_number}</div>,
    },
    {
      field: 'adress',
      headerName: 'Адрес',
      width: 120,
      editable: false,
    },
    {
      field: 'comment',
      headerName: 'Комментарии',
      width: 150,
      editable: false,
    },
    {
      field: 'orders',
      headerName: 'Заказы',
      width: 170,
      editable: false,
      renderCell: (params: any) => (
        <Box sx={{ py: 1 }}>
          {params?.row.products.map((item: any) => (
            <div key={item.id}>
              {item.menu?.name} {item.count}x
            </div>
          ))}
        </Box>
      ),
    },
    {
      field: 'total_price',
      headerName: 'Цена',
      width: 90,
      editable: false,
      renderCell: (params: any) => <div>{splitNum(params?.row.total_price)}</div>,
    },
    {
      field: 'createdAt',
      headerName: 'Время',
      width: 150,
      renderCell: (params: any) => (
        <div>{dayjs(params?.row.createdAt).format('DD/MM/YYYY H:mm')}</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Статус',
      width: 100,
      renderCell: (_) => (
        <div>
          {botStatus === 'Expectation' ? (
            <span style={{ color: '#1890ff' }}>Ожидание</span>
          ) : botStatus === 'Accepted' ? (
            <span style={{ color: '#50C878' }}>Принято</span>
          ) : (
            <span style={{ color: '#EB4C42' }}>Отказ</span>
          )}
        </div>
      ),
    },
    {
      field: 'date',
      headerName: 'Действии',
      width: 100,
      editable: false,
      renderCell: (params: any) => <BotStatusContent id={params?.row.id} />,
    },
  ];

  React.useEffect(() => {
    if (orders?.count > ordersCount) {
      setOrdersCount(orders.count);
      toast.success('У вас новый заказ!');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audioPlayer.current.play();
    }
  }, [orders?.count, ordersCount]);

  React.useEffect(() => {
    setPage(1);
  }, [botStatus]);

  return (
    <div className={styles.bot}>
      <Toaster />
      <audio ref={audioPlayer} src={NotificationSound} />
      <Box sx={{ height: 'calc(100vh - 170px)', width: '100%' }}>
        <DataGrid
          rows={orders?.data ? orders.data : []}
          rowCount={orders?.count}
          getRowHeight={() => 'auto'}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
          hideFooterPagination
          hideFooter
        />
        <Box display="grid" justifyContent="end" p="2">
          <Pagination
            count={orders?.count ? Math.ceil(orders.count / 10) : 1}
            page={page}
            onChange={handleChange}
            sx={{ p: 2 }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Bot;
