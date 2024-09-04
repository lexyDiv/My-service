import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

const NotFound = function() {

console.log("not found")


    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">
                404
              </Typography>
              <Typography variant="h6">
                pppppppppppppppppppppppppppppp
              </Typography>
              <Button variant="contained">Back Home</Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://tat-avtocenter.ru/images/2023/05/01/404-2.png"
                alt=""
                width={500} height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
}

export default NotFound;