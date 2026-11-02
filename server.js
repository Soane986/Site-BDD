const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// Configuration des créneaux et leur capacité maximale
const TIME_SLOTS = {
  '10:00': 50,
  '11:00': 50,
  '12:00': 50,
  '14:00': 50,
  '15:00': 50,
  '16:00': 50
};

app.use(cors());
app.use(express.json());

// SQLite DB
const DB_FILE = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_FILE);

// Créer les tables si nécessaire
function migrate() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password_hash TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      time TEXT,
      count INTEGER,
      type TEXT,
      total REAL,
      name TEXT,
      email TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      oeuvre_id TEXT,
      type TEXT CHECK(type IN ('like', 'dislike')),
      comment TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id),
      UNIQUE(user_id, oeuvre_id)
    )`);
  });
}

if (process.argv.includes('--migrate')) {
  migrate();
  console.log('Migration effectuée.');
  process.exit(0);
}

migrate();

// Enregistrement utilisateur
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis.' });
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    db.run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name || '', email, hash], function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ message: 'Email déjà utilisé.' });
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur.' });
      }
      const userId = this.lastID;
      const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '8h' });
      res.status(201).json({ id: userId, token });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis.' });

  db.get('SELECT id, password_hash FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) { console.error(err); return res.status(500).json({ message: 'Erreur serveur.' }); }
    if (!row) return res.status(401).json({ message: 'Identifiants invalides.' });
    const match = await bcrypt.compare(password, row.password_hash);
    if (!match) return res.status(401).json({ message: 'Identifiants invalides.' });
    const token = jwt.sign({ userId: row.id, email }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ id: row.id, token });
  });
});

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ message: 'Autorisation requise.' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Format d\'autorisation invalide.' });
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ message: 'Jeton invalide.' });
    req.user = payload;
    next();
  });
}

// Créer une réservation (protégée)
app.post('/api/reservations', authenticateToken, (req, res) => {
  const userId = req.user && req.user.userId;
  const { date, time, count, type, total, name, email } = req.body || {};
  db.run(`INSERT INTO reservations (user_id, date, time, count, type, total, name, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, date, time, count, type, total, name, email], function(err) {
      if (err) { console.error(err); return res.status(500).json({ message: 'Erreur insertion.' }); }
      res.status(201).json({ id: this.lastID, message: 'Réservation enregistrée.' });
    });
});

// Lister réservations de l'utilisateur connecté
app.get('/api/reservations', authenticateToken, (req, res) => {
  const userId = req.user && req.user.userId;
  db.all('SELECT * FROM reservations WHERE user_id = ?', [userId], (err, rows) => {
    if (err) { console.error(err); return res.status(500).json({ message: 'Erreur lecture.' }); }
    res.json(rows);
  });
});

// Créer ou mettre à jour un feedback pour une oeuvre
app.post('/api/feedback', authenticateToken, (req, res) => {
  const userId = req.user && req.user.userId;
  const { oeuvre_id, type, comment } = req.body || {};
  if (!oeuvre_id || !type || !['like', 'dislike'].includes(type)) {
    return res.status(400).json({ message: 'Oeuvre, type like/dislike et commentaire requis.' });
  }

  const sql = `INSERT INTO feedback (user_id, oeuvre_id, type, comment, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(user_id, oeuvre_id)
    DO UPDATE SET type = excluded.type, comment = excluded.comment, updated_at = datetime('now')`;

  db.run(sql, [userId, oeuvre_id, type, comment || '',], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur sauvegarde feedback.' });
    }
    res.status(201).json({ id: this.lastID || null, message: 'Feedback enregistré.' });
  });
});

// Récupérer les feedbacks de l'utilisateur connecté
app.get('/api/feedback', authenticateToken, (req, res) => {
  const userId = req.user && req.user.userId;
  db.all('SELECT * FROM feedback WHERE user_id = ?', [userId], (err, rows) => {
    if (err) { console.error(err); return res.status(500).json({ message: 'Erreur lecture feedback.' }); }
    res.json(rows);
  });
});

// Récupérer tous les feedbacks pour une oeuvre donnée (pour statistiques)
app.get('/api/feedback/:oeuvreId', authenticateToken, (req, res) => {
  const oeuvreId = req.params.oeuvreId;
  db.all('SELECT * FROM feedback WHERE oeuvre_id = ?', [oeuvreId], (err, rows) => {
    if (err) { console.error(err); return res.status(500).json({ message: 'Erreur lecture feedback.' }); }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Serveur API démarré: http://localhost:${PORT}`);
});
