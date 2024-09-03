export interface ClimaCardProps {
    infoClima: {
      location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
      };
      current: {
        condition: {
          icon: string;
        };
      };
      forecastItem: {
        forecastday: {
        astro:{
          sunrise:string,
          sunset:string
        };
        date: string;
        day: {
          avghumidity: number;
          condition: {
            text: string;
            icon:string
          };
          daily_chance_of_rain: number;
          mintemp_c: number;
          mintemp_f: number;
          maxtemp_c: number;
          maxtemp_f: number;
        };
      };
      };
    };
  }