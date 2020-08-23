export const QueriesApi = 'Evelyn Queries API';

export const CommandsApi = 'Evelyn Commands API';

export default {
  endpoints: [
    {
      name: QueriesApi,
      endpoint: process.env.REACT_APP_API_QUERY_BASE_URL,
    },
    {
      name: CommandsApi,
      endpoint: process.env.REACT_APP_API_COMMAND_BASE_URL,
    },
  ],
};
