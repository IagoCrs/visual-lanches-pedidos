export const ENV = {
    dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE || 'mock') as 'mock' | 'database',
    simulateMockError: process.env.NEXT_PUBLIC_MOCK_SIMULATE_ERROR === 'true',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
};
