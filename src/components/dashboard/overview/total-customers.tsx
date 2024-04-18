import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface TotalCustomersProps {
  //diff?: number;
  //trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function TotalCustomers({   sx, value }: TotalCustomersProps): React.JSX.Element {
  // const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  // const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Avatar sx={{ backgroundColor: '#e6fce6', height: '84px', width: '84px' }}>
            <img src='/assets/approved.png' alt='Requested' height={'56px'} width={'56px'}/>
              {/* <UsersIcon fontSize="var(--icon-fontSize-lg)" /> */}
            </Avatar>
            
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Approved
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            
          </Stack>
          {/* {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          ) : null} */}
        </Stack>
      </CardContent>
    </Card>
  );
}
