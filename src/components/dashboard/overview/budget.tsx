import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface BudgetProps {
  sx?: SxProps;
  value: string;
}

export function Budget({   sx, value }: BudgetProps): React.JSX.Element {
 
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Avatar sx={{ backgroundColor: '#fffbd9', height: '84px', width: '84px' }}>
              <img src='/assets/requested.png' alt='Requested' height={'56px'} width={'56px'}/>
            
            </Avatar>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
              Requested
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
