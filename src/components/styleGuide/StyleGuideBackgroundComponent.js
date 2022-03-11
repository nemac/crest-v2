import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { CodeBlock, a11yDark } from "react-code-blocks";
import { makeStyles } from '@mui/styles';


export default function StyleGuideBackgroundComponent(props) {
 const { title, gridTextColor, gridBackgroundColor, gridBorderColor, blockBackgroundColor } = props;

 const codeBlock = `<Box >
   <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: '${blockBackgroundColor}', color: '${gridTextColor}', borderColor: '${gridBorderColor}'}} >
     ${title}
   </Paper>
 </Box>`

 return (
   <div>

     <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
       <Grid item xs={1}>
         &nbsp;
       </Grid>
       <Grid item xs={11}>
         <Typography variant="h6" gutterBottom>
           {title} and text
         </Typography>
       </Grid>
     </Grid>

     <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
       <Grid item xs={1}>
         &nbsp;
       </Grid>
       <Grid item xs={3}>
         <Box >
           <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: gridBackgroundColor, color: gridTextColor, borderColor: gridBorderColor }} >
             {title}
           </Paper>
         </Box>
       </Grid>
       <Grid item xs={8}>
         &nbsp;
       </Grid>
     </Grid>

     <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={1}>
       <Grid item xs={1}>
         &nbsp;
       </Grid>
       <Grid item xs={11}>
         <Box>
           <CodeBlock
             theme={a11yDark}
             text={codeBlock}
             language={'jsx'}
             showLineNumbers={false} />
         </Box>
       </Grid>
     </Grid>


   </div>
 )
}
