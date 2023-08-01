import mysql.connector as mysql

app_config = {
    'MYSQL_HOST': 'localhost',
    'MYSQL_USER': 'root',
    'MYSQL_PASSWORD': '12345678',
    'MYSQL_DB': 'blog'
}

def connect_db():
    return mysql.connect(
        host=app_config['MYSQL_HOST'],
        user=app_config['MYSQL_USER'],
        password=app_config['MYSQL_PASSWORD'],
        database=app_config['MYSQL_DB']
    )

def create_sessions_table():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            session_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    conn.commit()
    cur.close()
    conn.close()
