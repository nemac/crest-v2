import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  color: theme.palette.CRESTGridBackground.contrastText,
  borderColor: theme.palette.CRESTBorderColor.main
}));

export const CrestList = styled('ol')(({ theme }) => ({
  marginTop: theme.spacing(0.5)
}));

export const AboutImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto'
}));
