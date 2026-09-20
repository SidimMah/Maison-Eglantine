type D1Result = { results?: Record<string, unknown>[] };

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean }>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  ADMIN_PASSWORD?: string;
}

const products = {
  'caftan-alaline': { name: 'Caftan Alaline', price: 29500, colors: ['Vert Bouteille', 'Bleu Nuit'], sizes: ['S', 'M', 'L'] },
  'lady-andalous': { name: 'Lady Andalous', price: 25000, colors: ['Noir'], sizes: ['S', 'M', 'L'] },
  kemkha: { name: 'Kemkha', price: 12000, colors: ['Vert', 'Gris', 'Noir'], sizes: ['S', 'M', 'L'] },
  'summer-elegance': { name: 'Summer Elegance', price: 2800, colors: ['Noir', 'Fuchsia', 'Orange'], sizes: ['S', 'M', 'L'] },
} as const;

const deliveryGroups = [
  [['Oran'], 590, 450],
  [['Alger', 'Sidi Bel Abbès', 'Mostaganem', 'Mascara', 'Aïn Témouchent'], 700, 550],
  [['Chlef', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Blida', 'Bouira', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Annaba', 'Guelma', 'Constantine', 'Médéa', "M'Sila", 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tissemsilt', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Relizane'], 900, 650],
  [['Laghouat', 'Biskra', 'Béchar', 'Tébessa', 'Djelfa', 'Ouargla', 'El Oued', 'Ghardaïa', 'Ouled Djellal', 'Béni Abbès', 'Touggourt', "El M'Ghair", 'El Menia'], 950, 750],
  [['Adrar', 'El Bayadh', 'Naâma', 'Timimoun', 'Bordj Badji Mokhtar'], 1050, 850],
  [['Tamanrasset', 'Illizi', 'Tindouf', 'In Salah', 'In Guezzam', 'Djanet'], 1600, 1400],
] as const;

const deliveryRates = new Map(deliveryGroups.flatMap(([wilayas, home, desk]) => wilayas.map((wilaya) => [wilaya, { home, desk }])));
const statuses = ['pending', 'confirmed', 'prepared', 'shipped', 'delivered', 'cancelled'] as const;
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

function authorized(request: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false;
  const value = request.headers.get('authorization') || '';
  if (!value.startsWith('Basic ')) return false;
  try {
    const [, password] = atob(value.slice(6)).split(':');
    return password === env.ADMIN_PASSWORD;
  } catch { return false; }
}

function adminAuth() {
  return new Response('Authentification requise.', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Maison Eglantine — Commandes"' } });
}

function cleanText(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function orderNumber() {
  return `EG-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
}

async function createOrder(request: Request, env: Env) {
  if (!env.DB) return json({ error: 'Le système de commande est en cours de configuration.' }, 503);
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; } catch { return json({ error: 'Données de commande invalides.' }, 400); }

  const name = cleanText(body.name, 100);
  const phone = cleanText(body.phone, 35);
  const wilaya = cleanText(body.wilaya, 50);
  const commune = cleanText(body.commune, 80);
  const address = cleanText(body.address, 300);
  const note = cleanText(body.note, 600);
  const deliveryMethod = body.deliveryMethod === 'desk' ? 'desk' : body.deliveryMethod === 'home' ? 'home' : '';
  const rate = deliveryRates.get(wilaya);
  const cart = Array.isArray(body.cart) ? body.cart : [];

  if (!name || !phone || !wilaya || !commune || !address || !deliveryMethod || !rate || cart.length < 1 || cart.length > 20) {
    return json({ error: 'Merci de vérifier les informations de la commande.' }, 400);
  }
  if (!/^[0-9+() .-]{6,35}$/.test(phone)) return json({ error: 'Le numéro de téléphone semble invalide.' }, 400);

  const items = [] as Array<{ slug: string; name: string; color: string; size: string; quantity: number; unitPrice: number; total: number }>;
  for (const raw of cart) {
    if (!raw || typeof raw !== 'object') return json({ error: 'Le panier est invalide.' }, 400);
    const item = raw as Record<string, unknown>;
    const slug = cleanText(item.slug, 60) as keyof typeof products;
    const product = products[slug];
    const color = cleanText(item.color, 50);
    const size = cleanText(item.size, 10);
    const quantity = Number(item.quantity);
    if (!product || !product.colors.includes(color as never) || !product.sizes.includes(size as never) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return json({ error: 'Un article du panier doit être vérifié.' }, 400);
    }
    items.push({ slug, name: product.name, color, size, quantity, unitPrice: product.price, total: product.price * quantity });
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const deliveryFee = rate[deliveryMethod];
  const total = subtotal + deliveryFee;
  const number = orderNumber();
  await env.DB.prepare(`INSERT INTO orders (order_number, customer_name, phone, wilaya, commune, address, delivery_method, delivery_fee, subtotal, total, note, items_json, status, created_at, client_ip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'), ?)`)
    .bind(number, name, phone, wilaya, commune, address, deliveryMethod, deliveryFee, subtotal, total, note, JSON.stringify(items), request.headers.get('CF-Connecting-IP') || null).run();
  return json({ orderNumber: number, subtotal, deliveryFee, total });
}

async function listOrders(env: Env) {
  if (!env.DB) return json({ error: 'La base de commandes n’est pas encore liée.' }, 503);
  const result = await env.DB.prepare('SELECT order_number, customer_name, phone, wilaya, commune, address, delivery_method, delivery_fee, subtotal, total, note, items_json, status, created_at FROM orders ORDER BY created_at DESC LIMIT 100').all();
  return json({ orders: result.results });
}

async function updateOrder(request: Request, env: Env, orderNumber: string) {
  if (!env.DB) return json({ error: 'La base de commandes n’est pas encore liée.' }, 503);
  let body: { status?: string };
  try { body = await request.json(); } catch { return json({ error: 'Requête invalide.' }, 400); }
  if (!statuses.includes(body.status as typeof statuses[number])) return json({ error: 'Statut invalide.' }, 400);
  await env.DB.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE order_number = ?").bind(body.status, orderNumber).run();
  return json({ ok: true });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/admin')) {
      if (!authorized(request, env)) return adminAuth();
      return env.ASSETS.fetch(request);
    }
    if (url.pathname === '/api/orders' && request.method === 'POST') return createOrder(request, env);
    if (url.pathname === '/api/orders' && request.method === 'GET') return authorized(request, env) ? listOrders(env) : adminAuth();
    const match = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (match && request.method === 'PATCH') return authorized(request, env) ? updateOrder(request, env, decodeURIComponent(match[1])) : adminAuth();
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
