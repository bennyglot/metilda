export const getRedisUrl = () => {
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = process.env.REDIS_PORT || '6379';
    const redisUrl = `redis://${redisHost}:${redisPort}`;
    
    return redisUrl;    
}