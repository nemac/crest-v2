import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

/*
custom MUI theme for CREST based on components and colors defined in the figma
design document https://www.figma.com/file/TCrt1Fgs9CnKeQH1NLB4aQ/CREST---Color?node-id=0%3A1
*/

const CustomTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#323232',
      paper: '#0a0a0a',
      contrastText: '#fff'
    },
    CRESTGridBackground: {
      main: '#323232',
      dark: '#0a0a0a',
      light: '#5b5b5b',
      contrastText: '#fff'
    },
    CRESTCta: {
      main: '#17A2B8',
      dark: '#007388',
      light: '#360d4ea',
      contrastText: '#fff'
    },
    CRESTPrimary: {
      main: '#F8F9FA',
      dark: '#c5c6c7',
      light: '#ffffff',
      contrastText: '#000000'
    },
    CRESTSecondary: {
      main: '#657A8E',
      dark: '#394e61',
      light: '#93a9be',
      contrastText: '#000000'
    },

    CRESTBorderColor: {
      main: '#555555',
    },
    mapLayerListButton: {
      main: '#444444',
      dark: '#6f6f6f',
      light: '#1d1d1d',
      contrastText: '#fff'
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#17A2B8',
          padding: '20px',
          fontWeight: '500',
          textDecorationColor: '#17A2B8',
          '&:hover': {
            color: '#007388',
            textDecorationColor: '#007388',
          },
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: '#555555',
          padding: '20px',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#555555',
        }
      }
    },
  }
});

export default CustomTheme