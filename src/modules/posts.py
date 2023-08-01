# posts.py

from flask import jsonify, request
from modules.database import connect_db

def get_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT posts.id, posts.title, posts.body, posts.created_at, users.username FROM posts INNER JOIN users ON posts.user_id = users.id')
    posts = cur.fetchall()
    cur.close()
    conn.close()

    posts_list = [{'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'username': post[4]} for post in posts]
    return jsonify(posts_list)


def create_post():
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = connect_db()
        cur = conn.cursor()
        
        # Verify the session_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()
        print(user)
        if user:
            data = request.get_json()
            title = data['title']
            body = data['body']
            user_id = user[0]

            cur.execute('INSERT INTO posts (title, body, user_id) VALUES (%s, %s, %s)',
                        (title, body, user_id))
            conn.commit()
            cur.close()
            conn.close()

            return jsonify({'message': 'Post created successfully'})
        
    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401


def get_user_posts():
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = connect_db()
        cur = conn.cursor()

        # Verify the session_id and get the user_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()
        print(user)
        if user:
            user_id = user[0]

            cur.execute('SELECT posts.id, posts.title, posts.body, posts.created_at, users.username FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id = %s', (user_id,))
            posts = cur.fetchall()
            cur.close()
            conn.close()

            posts_list = [{'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'username': post[4]} for post in posts]
            return jsonify(posts_list)

    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401

def get_post(id):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT posts.id, posts.title, posts.body, posts.created_at, users.username FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = %s', (id,))
    post = cur.fetchone()
    cur.close()
    conn.close()

    if post:
        post_data = {
            'id': post[0],
            'title': post[1],
            'body': post[2],
            'created_at': post[3],
            'username': post[4]  # Adding the username to the post_data dictionary
        }
        print(post_data)
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Post not found'}), 404

def edit_post(id):
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = connect_db()
        cur = conn.cursor()

        # Verify the session_id and get the user_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()
        print(user)
        if user:
            data = request.get_json()
            title = data['title']
            body = data['body']
            user_id = user[0]
            print(title)
            print(body)
            print(user_id)
            # Check if the post exists and is created by the user
            cur.execute('SELECT id FROM posts WHERE id = %s AND user_id = %s', (id, user_id))
            post = cur.fetchone()
            print(post)
            if post:
                # Update the post
                update_query = 'UPDATE posts SET title = %s, body = %s WHERE id = %s'
                update_values = (title, body, id)
                cur.execute(update_query, update_values)
                conn.commit()
                cur.close()
                conn.close()

                return jsonify({'message': 'Post updated successfully'})

            # If the post is not found or is not created by the user, return an error response
            return jsonify({'message': 'Post not found or unauthorized'}), 401

    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401


def delete_post(id):
    session_id = request.cookies.get('session_id')
    if session_id:
        conn = connect_db()
        cur = conn.cursor()

        # Verify the session_id and get the user_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()

        if user:
            user_id = user[0]

            # Check if the post exists and is created by the user
            cur.execute('SELECT id FROM posts WHERE id = %s AND user_id = %s', (id, user_id))
            post = cur.fetchone()

            if post:
                cur.execute('DELETE FROM comments WHERE post_id = %s', (id,))
                # Delete the post
                cur.execute('DELETE FROM posts WHERE id = %s', (id,))
                conn.commit()
                cur.close()
                conn.close()

                return jsonify({'message': 'Post deleted successfully'})

            # If the post is not found or is not created by the user, return an error response
            return jsonify({'message': 'Post not found or unauthorized'}), 401

    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401


def get_latest_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute(
        'SELECT posts.id, posts.title, posts.body, posts.created_at, COUNT(comments.id) as comment_count '
        'FROM posts '
        'LEFT JOIN comments ON posts.id = comments.post_id '
        'GROUP BY posts.id '
        'ORDER BY posts.created_at DESC '
        'LIMIT 3'
    )
    posts = cur.fetchall()
    cur.close()
    conn.close()
    posts_list = [
        {'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'comment_count': post[4]}
        for post in posts
    ]
    return jsonify(posts_list)

def get_popular_posts():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute(
        'SELECT posts.id, posts.title, posts.body, posts.created_at, COUNT(comments.id) as comment_count '
        'FROM posts '
        'LEFT JOIN comments ON posts.id = comments.post_id '
        'GROUP BY posts.id '
        'ORDER BY comment_count DESC, posts.created_at DESC '
        'LIMIT 3'
    )
    posts = cur.fetchall()
    cur.close()
    conn.close()
    posts_list = [
        {'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'comment_count': post[4]}
        for post in posts
    ]
    return jsonify(posts_list)


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

def create_comment(post_id):
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = connect_db()
        cur = conn.cursor()
        
        # Verify the session_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()
        print(user)
        if user:
            data = request.get_json()
            user_id = user[0]
            body = data['body']

            cur.execute('INSERT INTO comments (post_id, user_id, body) VALUES (%s, %s, %s)',
                        (post_id, user_id, body))
            conn.commit()
            cur.close()
            conn.close()

            return jsonify({'message': 'Comment created successfully'})
        
    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401

