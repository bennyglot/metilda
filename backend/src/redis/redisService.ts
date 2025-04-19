import { createClient, RedisClientType } from 'redis';

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({ url: 'redis://localhost:6379' });

    this.client.on('error', (err) => {
      console.error('[Redis] Error:', err);
    });

    this.connect();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  private async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('[Redis] Connected');
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async set(key: string, value: string, expirationInSec?: number): Promise<void> {
    if (expirationInSec) {
      await this.client.set(key, value, { EX: expirationInSec });
    } else {
      await this.client.set(key, value);
    }
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  public async scanByPrefix(prefix: string): Promise<string[]> {
    const matchingKeys: string[] = [];
    let cursor = 0;

    do {
      const result = await this.client.scan(cursor, {
        MATCH: `${prefix}*`,
        COUNT: 100, // optional performance tuning
      });

      cursor = Number(result.cursor);
      matchingKeys.push(...result.keys);
    } while (cursor !== 0);

    return matchingKeys;
  }

  public async scanByPrefixWithValues(prefix: string): Promise<Record<string, string>> {
    const keys = await this.scanByPrefix(prefix);
    const values = await Promise.all(keys.map((key) => this.get(key)));

    const result: Record<string, string> = {};
    keys.forEach((key, index) => {
      if (values[index] !== null) {
        result[key] = values[index]!;
      }
    });

    return result;
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log('[Redis] Disconnected');
  }
}

export default RedisService;
