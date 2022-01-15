import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import styles from "./style";

export default function CustomCard({ dadosPokemonAPI }) {
  return (
    <Card sx={styles.cardStyle}>
      <CardActionArea>
        <div style={{ maxWidth: "300px" }}>
          <CardMedia
            sx={styles.imageStyle}
            component="img"
            width="auto"
            image={dadosPokemonAPI.image}
            alt={dadosPokemonAPI.name}
          />
        </div>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ backgroundColor: "rgba(62, 113, 145, 0.4)" }}
        >
          {dadosPokemonAPI.name}
        </Typography>
        <CardContent sx={{ backgroundColor: "rgba(62, 113, 145, 0.5)" }}>
          <Typography variant="h6" color="text.primary" component={"p"}>
            Habilidades
          </Typography>
          {dadosPokemonAPI.abilities &&
            dadosPokemonAPI.abilities.map(({ ability }) => {
              return (
                <Typography
                  key={ability.name}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {ability.name}
                </Typography>
              );
            })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
