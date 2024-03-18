export function SHA256(str: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 将密码转换为 Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    // 使用 SubtleCrypto 接口进行 SHA-256 加密
    crypto.subtle
      .digest('SHA-256', data)
      .then((hashBuffer) => {
        // 将哈希值转换为 Uint8Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // 将 Uint8Array 转换为十六进制字符串
        const hashed = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

        // 输出加密后的
        resolve(hashed);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
