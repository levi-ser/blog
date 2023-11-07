import mysql.connector.pooling

app_config = {
    'MYSQL_HOST': 'localhost',
    'MYSQL_USER': 'your user',
    'MYSQL_PASSWORD': 'your password',
    'MYSQL_DB': 'your DB'
}

# Create a connection pool
pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=3,
    host=app_config['MYSQL_HOST'],
    user=app_config['MYSQL_USER'],
    password=app_config['MYSQL_PASSWORD'],
    database=app_config['MYSQL_DB'],
    buffered=True
)

# Function to get a database connection from the pool
def get_db_connection():
    return pool.get_connection()

def create_sessions_table():
    conn = get_db_connection()
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
