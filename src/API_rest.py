from flask import Flask, jsonify, request
import mysql.connector
from settings import dbpwd
from mysql.connector import Error

app = Flask(__name__)
try:
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password=dbpwd,
        database='world'
    )
    print('Connected to MySQL database')
except Error as e:
    print(f'Error connecting to MySQL database: {e}')
@app.route('/posts', methods=['GET'])
def get_all_posts():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM posts')
        posts = cursor.fetchall()
        cursor.close()
        return jsonify(posts)
    except Error as e:
        print(f'Error retrieving posts from database: {e}')
        return jsonify(message='Error retrieving posts'), 500

@app.route('/posts', methods=['POST'])
def create_post():
    title = request.json['title']
    body = request.json['body']
    user_id = request.json['user_id']
    status = request.json['status']

    try:
        cursor = connection.cursor()
        cursor.execute(
            'INSERT INTO posts (title, body, user_id, status) VALUES (%s, %s, %s, %s)',
            (title, body, user_id, status)
        )
        connection.commit()
        cursor.close()
        return jsonify(message='Post created successfully')
    except Error as e:
        print(f'Error creating post: {e}')
        return jsonify(message='Error creating post'), 500
@app.errorhandler(404)
def page_not_found(error):
    return jsonify(message='Page not found'), 404

@app.errorhandler(Exception)
def handle_error(error):
    print(f'Unhandled Exception: {error}')
    return jsonify(message='Internal server error'), 500

@app.route('/')
def fallback_route():
    return jsonify(message='Welcome to the API')

if __name__ == '__main__':
    app.run(debug=True)
