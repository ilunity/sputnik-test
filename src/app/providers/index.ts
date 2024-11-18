import compose from 'compose-function';
import { withQueryClient } from './query-client';

export const withProviders = compose(withQueryClient);
