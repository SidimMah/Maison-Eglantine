CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  commune TEXT NOT NULL,
  address TEXT NOT NULL,
  delivery_method TEXT NOT NULL,
  delivery_fee INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  total INTEGER NOT NULL,
  note TEXT,
  items_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT,
  client_ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
