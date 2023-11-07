# posts.py

from flask import jsonify, request
from modules.database import get_db_connection






def get_posts():
    conn = get_db_connection()
    cur = conn.cursor()

    # Get the sort parameter from the query string (default to views in ascending order)
    sort_by = request.args.get('sort', 'views')

    # Order the posts based on the sort parameter
    if sort_by == 'views':
        sort_order = 'ASC'
    elif sort_by == '-views':
        sort_order = 'DESC'
    else:
        sort_order = 'ASC'  # Default to ascending order

    cur.execute(
        'SELECT posts.id, posts.title, posts.body, posts.created_at, users.username, posts.view_count '
        'FROM posts '
        'INNER JOIN users ON posts.user_id = users.id '
        f'ORDER BY posts.view_count {sort_order}'
    )
    posts = cur.fetchall()
    cur.close()
    conn.close()

    posts_list = [{'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'username': post[4], 'view_count': post[5]} for post in posts]
    return jsonify(posts_list)


def create_post():
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = get_db_connection()
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
            selected_tags = data.get('tags', [])  # Get selected tags from the request
            new_tags = data.get('newTags', [])  # Get the list of new tags from the request

            try:
                cur.execute('INSERT INTO posts (title, body, user_id) VALUES (%s, %s, %s)',
                            (title, body, user_id))
                conn.commit()

                post_id = cur.lastrowid  # Get the ID of the newly created post

                # Associate selected tags with the post
                for tag_id in selected_tags:
                    cur.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (%s, %s)', (post_id, tag_id))

                # Create new tags if 'newTags' list is provided
                for new_tag in new_tags:
                    # Check if the tag already exists
                    cur.execute('SELECT id FROM tags WHERE tag_name = %s', (new_tag,))
                    existing_tag = cur.fetchone()

                    if not existing_tag:
                        cur.execute('INSERT INTO tags (tag_name) VALUES (%s)', (new_tag,))
                        conn.commit()

                    # Associate the new tag with the post
                    cur.execute('SELECT id FROM tags WHERE tag_name = %s', (new_tag,))
                    new_tag_id = cur.fetchone()[0]
                    cur.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (%s, %s)', (post_id, new_tag_id))

                conn.commit()
                cur.close()
                conn.close()

                return jsonify({'message': 'Post created successfully'})
            except Exception as e:
                return jsonify({'message': str(e)}), 500

    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401



def get_user_posts():
    session_id = request.cookies.get('session_id')
    print(session_id)
    if session_id:
        conn = get_db_connection()
        cur = conn.cursor()

        # Verify the session_id and get the user_id
        cur.execute('SELECT user_id FROM sessions WHERE session_id = %s', (session_id,))
        user = cur.fetchone()
        print(user)
        if user:
            user_id = user[0]

            cur.execute('''
                SELECT 
                    posts.id, 
                    posts.title, 
                    posts.body, 
                    posts.created_at, 
                    users.username,
                    GROUP_CONCAT(IFNULL(tags.tag_name, '') SEPARATOR ', ') AS tags
                FROM 
                    posts 
                INNER JOIN 
                    users 
                    ON posts.user_id = users.id 
                LEFT JOIN 
                    post_tags 
                    ON posts.id = post_tags.post_id
                LEFT JOIN 
                    tags 
                    ON post_tags.tag_id = tags.id
                WHERE 
                    posts.user_id = %s
                GROUP BY 
                    posts.id, 
                    posts.title, 
                    posts.body, 
                    posts.created_at, 
                    users.username
            ''', (user_id,))
            
            posts = cur.fetchall()
            cur.close()
            conn.close()

            posts_list = [{'id': post[0], 'title': post[1], 'body': post[2], 'created_at': post[3], 'username': post[4], 'tags': post[5]} for post in posts]
            return jsonify(posts_list)

    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401


def get_post(id):
    conn = get_db_connection()
    cur = conn.cursor()

    # Increment the view_count for the post
    cur.execute('UPDATE posts SET view_count = view_count + 1 WHERE id = %s', (id,))
    conn.commit()

    # Retrieve the post data
    cur.execute('SELECT posts.id, posts.title, posts.body, posts.created_at, users.username, posts.view_count FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = %s', (id,))
    post = cur.fetchone()
    cur.close()
    conn.close()

    if post:
        post_data = {
            'id': post[0],
            'title': post[1],
            'body': post[2],
            'created_at': post[3],
            'username': post[4],
            'view_count': post[5]  # Adding the view_count to the post_data dictionary
        }
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Post not found'}), 404



# In your Flask backend
def edit_post(id):
    # Your existing code to verify session_id and user authentication
    conn = get_db_connection()
    cur = conn.cursor()
    data = request.get_json()
    print("Received JSON Data:", data)
    title = data['title']
    body = data['body']
    tags = data.get('tags', [])  # Get tags as an array from the request
    print("Received Tags:", tags)

    try:
        # Your existing code to update the post title and body

        # Delete existing tags for the post that are not in the new 'tags' list
        cur.execute('SELECT tag_id FROM post_tags WHERE post_id = %s', (id,))
        existing_tags = set(tag[0] for tag in cur.fetchall())

        for existing_tag_id in existing_tags:
            if existing_tag_id not in tags:
                cur.execute('DELETE FROM post_tags WHERE post_id = %s AND tag_id = %s', (id, existing_tag_id))

        # Insert new tags for the post
        for tag in tags:
            # Assuming 'tags' is an array of tag names
            # Check if the tag already exists
            cur.execute('SELECT id FROM tags WHERE tag_name = %s', (tag,))
            existing_tag = cur.fetchone()

            if not existing_tag:
                cur.execute('INSERT INTO tags (tag_name) VALUES (%s)', (tag,))
                conn.commit()

            # Associate the new tag with the post
            cur.execute('SELECT id FROM tags WHERE tag_name = %s', (tag,))
            new_tag_id = cur.fetchone()[0]
            cur.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (%s, %s)', (id, new_tag_id))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'Post updated successfully'})

    except Exception as e:
        return jsonify({'message': str(e)}), 500



def delete_post(id):
    session_id = request.cookies.get('session_id')
    if session_id:
        conn = get_db_connection()
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
    conn = get_db_connection()
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
    conn = get_db_connection()
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
    conn = get_db_connection()
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
        conn = get_db_connection()
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
        




def get_user_tags(post_id):
    conn = get_db_connection()
    cur = conn.cursor()

    # Modified SQL query to retrieve tags associated with the post
    cur.execute('''
    SELECT 
        GROUP_CONCAT(IFNULL(tags.tag_name, '') SEPARATOR ', ') AS tags
    FROM 
        post_tags 
    LEFT JOIN 
        tags 
        ON post_tags.tag_id = tags.id
    WHERE 
        post_tags.post_id = %s
''', (post_id,))

    tags = cur.fetchone()
    cur.close()
    conn.close()
    print(tags)
    if tags:
        post_tags = tags[0].split(', ')
        return jsonify(post_tags)

    return jsonify([])  # Return an empty list if no tags are found for the post
      
        
    # If the session_id is not found or the user is not authenticated, return an error response
    return jsonify({'message': 'Authentication required'}), 401

