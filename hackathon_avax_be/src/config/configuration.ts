
export interface DatabaseConfig {
  user_name: string;
  password: string;
  name: string;
  host: string;
  port: string;
  synchronize: boolean;
}

export default () => {
  return {
    PORT: process.env.DB_PORT || 8001,
    DB: {
      USER_NAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      TYPE: process.env.DB_TYPE,
      NAME: process.env.DB_NAME,
      HOST: process.env.DB_HOST,
      PORT: parseInt(process.env.DB_PORT, 10) || 3306,
      DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
    },
  };
};

