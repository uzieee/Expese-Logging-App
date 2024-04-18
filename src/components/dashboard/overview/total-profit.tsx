import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
}

export function TotalProfit({ value, sx }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
        <Avatar sx={{ backgroundColor: '#ffd3d9', height: '84px', width: '84px' }}>
            {/* <ReceiptIcon fontSize="var(--icon-fontSize-lg)" /> */}
            <img src='/assets/rejected.png' alt='Requested' height={'56px'} width={'56px'}/>
            
          </Avatar>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
             Rejected
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          
        </Stack>
      </CardContent>
    </Card>
  );
}
