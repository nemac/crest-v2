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

export default function StyleGuideIconComponent(props) {
 const { title, themeName, SelectedIconName, UnselectedIconName, selectedIcon, unSelectedIcon, blockBackgroundColor, flip, color } = props;

 const transformDeg = flip ? 'rotate(-180deg)' : 'rotate(0)';
 const colorAdd = color ? `color="${color}"` : ''
 const flipText = flip ? `sx={{transform: '${transformDeg}'}}` : '';
 const codeBlock = `import { ${UnselectedIconName}, ${SelectedIconName} } from '@mui/icons-material';

 <${UnselectedIconName} ${colorAdd} />
 <${SelectedIconName} ${colorAdd} ${flipText} />`;

 return (
   <div>

     <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
       <Grid item xs={1}>
         &nbsp;
       </Grid>
       <Grid item xs={11}>
         <Typography variant="h6" gutterBottom>
           {title}
         </Typography>
       </Grid>
     </Grid>

     <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={0}>
       <Grid item xs={1}>
         &nbsp;
       </Grid>
       <Grid item xs={3} pl={0}>
         <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTGridBackground.dark'}}>

           <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center">
             <Grid item xs={6} >
               <Box alignItems="center" justifyContent="center" display="flex">
                 {unSelectedIcon}
               </Box>
               <Box alignItems="center" justifyContent="center" display="flex" pt={0.5}>
                 Unselected
               </Box>
             </Grid>
             <Grid item xs={6}>
               <Box alignItems="center" justifyContent="center" display="flex" >
                 {selectedIcon}
               </Box>
               <Box alignItems="center" justifyContent="center" display="flex" pt={0.5}>
                 Selected
               </Box>
             </Grid>
           </Grid>

         </Paper>
       </Grid>
       <Grid item xs={8}>
         &nbsp;
       </Grid>
     </Grid>

     <Grid container spacing={3} justifyContent="start" alignItems="start" pb={3} px={3} pt={1}>
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
