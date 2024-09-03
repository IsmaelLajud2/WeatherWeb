export interface Clima {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
    forecast: {
      forecastday: {
        date: string;
        day: {
          avghumidity: number;
          condition: {
            text: string;
            icon: string;
          };
          daily_chance_of_rain: number;
          mintemp_c: number;
          mintemp_f: number;
          maxtemp_c: number;
          maxtemp_f: number;
        };
        astro: {
          sunrise: string;
          sunset: string;
        };
      }[];
    };
  }
  