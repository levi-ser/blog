from flask import Flask, make_response
from flask_cors import CORS
from modules.auth import signup, login, logout, check_login
from modules.posts import (
get_posts, create_post, get_user_posts, get_post, edit_post, delete_post,
    get_latest_posts, get_popular_posts, get_post_comments, create_comment, get_user_tags )

from modules.database import create_sessions_table

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[
     "http://localhost:3000", "http://127.0.0.1:5000"], expose_headers='Set-Cookie')

# Database setup
create_sessions_table()

# authentication
app.route('/check_login', methods=['GET'])(check_login)
app.route('/signup', methods=['POST'])(signup)
app.route('/login', methods=['POST'])(login)
app.route('/logout', methods=['POST'])(logout)

# post
app.route('/posts', methods=['GET'])(get_posts)
app.route('/posts/new', methods=['POST'])(create_post)
app.route('/myposts', methods=['GET'])(get_user_posts)
app.route('/posts/<int:id>', methods=['GET'])(get_post)
app.route('/myposts/<int:id>/edit', methods=['PUT'])(edit_post)
app.route('/myposts/<int:id>/delete', methods=['DELETE'])(delete_post)
app.route('/posts/latest', methods=['GET'])(get_latest_posts)
app.route('/posts/popular', methods=['GET'])(get_popular_posts)
app.route('/posts/<int:post_id>/comments', methods=['GET'])(get_post_comments)
app.route('/posts/<int:post_id>/comments/new', methods=['POST'])(create_comment)
app.route('/posts/<int:post_id>/tags', methods=['GET'])(get_user_tags)



if __name__ == '__main__':
    app.run()
