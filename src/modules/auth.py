# auth.py

from flask import jsonify, request, make_response
import bcrypt
import uuid

from modules.database import connect_db

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

def login():
    if 'session_id' in request.cookies:
        return jsonify({'message': 'Already logged in', 'loggedIn': True}), 200

    data = request.get_json()
    username = data['username']
    password = data['password']

    conn = connect_db()
    cur = conn.cursor()

    cur.execute('SELECT id, username, password FROM users WHERE username = %s', (username,))
    user = cur.fetchone()
    print(user)

    if user is not None:
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
            return jsonify({'message': 'Invalid username or password'}), 401
    else:
        cur.fetchall()  
        cur.close()
        conn.close()
        return jsonify({'message': 'Invalid username or password'}) ,401

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

def check_login():
    session_id = request.cookies.get("session_id")
    print(session_id)
    if session_id is not None:
        conn = connect_db()
        cur = conn.cursor()
        cur.execute('SELECT session_id  FROM sessions WHERE session_id = %s',
                    (session_id,))
        session = cur.fetchone()
        cur.close()
        conn.close()

        if session:
            return jsonify({'loggedIn': True}), 200
    return jsonify({'loggedIn': False}), 401