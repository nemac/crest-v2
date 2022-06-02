import * as React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  }
}));

export default function BoxForLayouts(props) {
  const classes = useStyles();
  const { children, boxHeight, boxMarginTop } = props;

  return (
    <Box className={classes.contentBox} style={{ height: boxHeight, marginTop: boxMarginTop }}>
      <Typography variant="body" component="div" gutterBottom>
        {children}
      </Typography>
    </Box>
  );
}

BoxForLayouts.propTypes = {
  children: PropTypes.node.isRequired,
  boxHeight: PropTypes.string.isRequired,
  boxMarginTop: PropTypes.string
};
