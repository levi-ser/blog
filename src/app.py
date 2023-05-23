from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector as mysql

app = Flask(__name__)
CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'blog'


def connect_db():
    return mysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )


# Fetch all posts
@app.route('/posts', methods=['GET'])
def get_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM posts')
    posts = cur.fetchall()
    cur.close()
    conn.close()
    # Convert the fetched posts to a list of dictionaries
    posts_list = [{'id': post[0], 'title': post[1], 'content': post[2], 'created_at': post[3]} for post in posts]
    return jsonify(posts_list)


# Create a new post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data['title']
    content = data['content']

    conn = connect_db()
    cur = conn.cursor()
    cur.execute('INSERT INTO posts (title, content) VALUES (%s, %s)', (title, content))
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
        post_data = {'id': post[0], 'title': post[1], 'content': post[2], 'created_at': post[3]}
        print(post_data)
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Post not found'}), 404



if __name__ == "__main__":
	app.run()