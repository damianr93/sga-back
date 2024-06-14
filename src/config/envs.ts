import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    MONGO_URI: get('MONGO_URI').required().asString(),
}
