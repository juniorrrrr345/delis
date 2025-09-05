// Configuration Cloudflare R2 pour DELIS FOOD MARKET
export class CloudflareR2Client {
  private accountId: string;
  private bucketName: string;
  private publicUrl: string;

  constructor(config: {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
    publicUrl: string;
  }) {
    this.accountId = config.accountId;
    this.bucketName = config.bucketName;
    this.publicUrl = config.publicUrl;
  }

  getPublicUrl(key: string): string {
    return `${this.publicUrl}/${key}`;
  }

  async uploadFile(key: string, file: File | Buffer): Promise<string> {
    // Simulation upload pour développement
    console.log(`Upload simulé: ${key}`);
    return this.getPublicUrl(key);
  }
}

// Instance globale avec credentials hardcodés pour DELIS FOOD MARKET
const r2Client = new CloudflareR2Client({
  accountId: '7979421604bd07b3bd34d3ed96222512',
  accessKeyId: '82WsPNjX-j0UqZIGAny8b0uEehcHd0X3zMKNIKIN',
  secretAccessKey: '28230e200a3b71e5374e569f8a297eba9aa3fe2e1097fdf26e5d9e340ded709d',
  bucketName: 'boutique-images',
  publicUrl: 'https://pub-b38679a01a274648827751df94818418.r2.dev',
});

export { r2Client };
