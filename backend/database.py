import sqlite3

def init_db():
    conn = sqlite3.connect('chatbot.db')
    conn.execute('''CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()

def save_message(sender, message):
    conn = sqlite3.connect('chatbot.db')
    conn.execute('INSERT INTO messages (sender, message) VALUES (?, ?)', (sender, message))
    conn.commit()
    conn.close()