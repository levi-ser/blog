from flask import Flask, jsonify, request, abort, make_response, session
from flask_cors import CORS
import mysql.connector as mysql
import bcrypt
import uuid
import json
import datetime
from settings import dbpwd

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[
     "http://localhost:3000", "http://127.0.0.1:5000"], expose_headers='Set-Cookie')


# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = dbpwd
app.config['MYSQL_DB'] = 'blog'

# Secret key for signing cookies
app.config['SECRET_KEY'] = 'your-secret-key'


def connect_db():
    return mysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
# Create 'sessions' table


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


create_sessions_table()


@app.route('/check-login', methods=['GET'])
def check_login():
    session_id = request.cookies.get("session_id")
    if session_id:
        conn = connect_db()
        cur = conn.cursor()
        cur.execute('SELECT session_id  FROM sessions WHERE session_id = %s',
                    (session_id,))
        session = cur.fetchone()
        cur.close()
        conn.close()

        if session:
            return jsonify({'loggedIn': True})
    return jsonify({'loggedIn': False})


# User signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']

    conn = connect_db()
    cur = conn.cursor()

    # Check if the username already exists
    cur.execute('SELECT username  FROM users WHERE username = %s', (username,))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({'message': 'Username already exists'})

    # Hash the user's password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    cur.execute('INSERT INTO users (username, password) VALUES (%s, %s)',
                (username, hashed_password))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({'message': 'User signed up successfully'}), 201

# User login


@app.route('/login', methods=['POST'])
def login():
    if 'session_id' in request.cookies:
        return jsonify({'message': 'Already logged in', 'loggedIn': True}), 200

    data = request.get_json()
    username = data['username']
    password = data['password']

    conn = connect_db()
    cur = conn.cursor()

    cur.execute('SELECT id, password FROM users WHERE username = %s', (username,))
    user = cur.fetchone()

    if user:
        # Check if the password matches
        if bcrypt.checkpw(password.encode('utf-8'), user[2].encode('utf-8')):
            session_id = str(uuid.uuid4())
            query = "INSERT INTO sessions (user_id, session_id) VALUES (%s, %s)"
            values = (user[0], session_id)
            print("Query:", query)
            print("Values:", values)
            cur.execute(query, values)
            conn.commit()
            cur.fetchall()  
            cur.close()
            conn.close()
            response = make_response(
                jsonify({'message': 'User logged in successfully', 'loggedIn': True}))
            response.set_cookie('session_id', session_id,
                                path='/', samesite='None', secure=True)
            print(session_id)
            return response, 200
        else:
            cur.fetchall()  
            cur.close()
            conn.close()
            return jsonify({'message': 'Invalid username or password'})
    else:
        cur.fetchall()  
        cur.close()
        conn.close()
        return jsonify({'message': 'Invalid username or password'})

# User logout


@app.route('/logout', methods=['POST'])
def logout():
    session_id = request.cookies.get('session_id')
    print(session_id)

    if session_id:
        query = "DELETE FROM sessions WHERE session_id = %s"
        values = (session_id,)
        conn = connect_db()
        cur = conn.cursor()
        cur.execute(query, values)
        conn.commit()
        cur.close()
        conn.close()

    response = make_response(
        jsonify({'message': 'User logged out successfully', 'loggedIn': False}))
    response.set_cookie("session_id", "", expires=0)
    return response



@app.route('/posts', methods=['GET'])
def get_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT id, title, body, created_at FROM posts')
    posts = cur.fetchall()
    cur.close()
    conn.close()

    posts_list = [{'id': post[0], 'title': post[1],
                   'body': post[2], 'created_at': post[3]} for post in posts]
    return jsonify(posts_list)


# Create a new post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data['title']
    body = data['body']

    conn = connect_db()
    cur = conn.cursor()
    cur.execute('INSERT INTO posts (title, body) VALUES (%s, %s)',
                (title, body))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Post created successfully'})


# Fetch a single post
@app.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM posts WHERE id = %s', (id,))
    post = cur.fetchone()
    cur.close()
    conn.close()

    if post:
        post_data = {'id': post[0], 'title': post[1],
                     'body': post[2], 'created_at': post[3]}
        print(post_data)
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Post not found'}), 404


# Fetch latest posts


@app.route('/latest-posts', methods=['GET'])
def get_latest_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC LIMIT 3')
    posts = cur.fetchall()
    cur.close()
    conn.close()
    posts_list = [{'id': post[0], 'title': post[1],
                   'body': post[2], 'created_at': post[3]} for post in posts]
    return jsonify(posts_list)

# Fetch popular posts


@app.route('/popular-posts', methods=['GET'])
def get_popular_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT id, title, body, created_at FROM posts')
    posts = cur.fetchall()
    cur.close()
    conn.close()
    posts_list = [{'id': post[0], 'title': post[1],
                   'body': post[2], 'created_at': post[3]} for post in posts]
    return jsonify(posts_list)


# Fetch comments for a post
@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def get_post_comments(post_id):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT comments.id, comments.body, users.username, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = %s', (post_id,))
    comments = cur.fetchall()
    cur.close()
    conn.close()

    comments_list = [{'id': comment[0], 'body': comment[1],
                      'username': comment[2], 'created_at': comment[3]} for comment in comments]
    return jsonify(comments_list)

# Create a new comment


@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    post_id = data['post_id']
    user_id = data['user_id']
    body = data['body']

    conn = connect_db()
    cur = conn.cursor()

    # Get the current timestamp
    created_at = datetime.datetime.now()

    cur.execute('INSERT INTO comments (post_id, user_id, body, created_at) VALUES (%s, %s, %s, %s)',
                (post_id, user_id, body, created_at))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({'message': 'Comment created successfully'})


if __name__ == "__main__":
    app.run()
