import { createClient, RedisClientType } from 'redis';

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  public static getInstance(redisUrl: string): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService(redisUrl);
    }
    return RedisService.instance;
  }

  public async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}

export default RedisService;