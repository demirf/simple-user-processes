import OrmDatabaseConfig from './orm.database.config';
import { DataSource } from 'typeorm';

export default new DataSource(new OrmDatabaseConfig().getOptions());
