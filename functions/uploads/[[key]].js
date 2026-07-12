// 从 R2 读取并配信上传的图片，路径 /uploads/<filename>
export async function onRequestGet({ params, env }) {
  const key = Array.isArray(params.key) ? params.key.join('/') : params.key;
  const obj = await env.BUCKET.get(key);
  if (!obj) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  return new Response(obj.body, { headers });
}
