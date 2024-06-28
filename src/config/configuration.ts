import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.DATABASE_URL,
    },
    port: parseInt(process.env.PORT, 10) || 3000,
  };
});
