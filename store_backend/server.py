import re
from flask import Flask, request, redirect, session, Response
from h11 import Request
import db_connect as db
from api_methods import validate, add_user, add_customer, adding_to_cart
from flask_cors import CORS
import jwt_tokens as tokens
from flask import jsonify
import datetime 
import password_hashing as ph

secret = tokens.secret_key


ses = db.session()
con = db.conn
USER = db.User
CUSTOMER = db.Customer
PRODUCT = db.Product
CATEGORY = db.Category
CART = db.Cart

app = Flask(__name__)
app.secret_key = secret

CORS(app,origins="http://localhost:5173", allow_headers=["Content-Type","Authorization","Access-Control-Allow-Origin"], supports_credentials=True)

@app.route('/login', methods=['POST'])
def login():
    #-----------------------------validation------------------------------------
    testing = request.get_json()
    print()
    print("Request Accpeted ,Logging in")
    username = testing['username']
    password = testing['password']
    users = ses.query(USER).all()
    password_hasher = {i.username: i.password for i in users}
    usernames = [i.username for i in users]
    status = validate(username, password, usernames, password_hasher)
    role = "customer"
    if(status[0]==False):
        return redirect("http://localhost:5173/auth_register")
    
    
    #-------------after validation----------------
    timestamp = datetime.datetime.now()
    
    payload = {"username": username, "key":password_hasher[username] ,"timestamp": str(timestamp) , "role" : role} # type: ignore
    auth_token = tokens.generate_token(payload)
    Response = jsonify(payload)
    Response.headers["Authorization"] = auth_token
    Response.headers["Access-Control-Expose-Headers"] = "Authorization"
    return Response

@app.route('/register', methods=['POST'])
def register():
    print("Request Accpeted ,Registering")
    source = request.get_json()
    username = source['username']
    full_name = source['full_name']
    password = source['password']
    contact = source['contact']
    address = source['address']
    email = source['email']
    users = ses.query(USER).all()
    usernames = [i.username for i in users]
    status_user = add_user(username, ph.hash_password(password), full_name, email, ses, usernames)
    if(status_user[0]):
        id_new = ses.query(USER).filter(USER.username == username).first()
        add_customer(id_new, contact, address, ses)
    ses.commit()
    return redirect("http://localhost:5173/auth_login")

@app.route('/call/product/<id>', methods=['GET'])
def product(id):
    products = ses.query(PRODUCT).filter(PRODUCT.category_id == id).all()
    print("Request Accpeted ,Product")
    category = ses.query(CATEGORY).filter(CATEGORY.id == id).first()
    output = { "name": category.description, "items":[{"p_id": products[i].id,"item":products[i].name, "description":products[i].description, "price":products[i].price, "stock":products[i].quantity} for i in range(len(products))]} # type: ignore
    return output

@app.route('/validate_token', methods=['POST'])
def validate_token():
    print("Request Accpeted ,Validating Token")
    token = request.headers['Authorization']
    details = request.get_json()
    name = details['username']
    key = details['key']
    payload = tokens.validate_token(token)
    print(details)
    if(payload['username'] == name and payload['key'] == key): #type: ignore
        print("Valid Token")
        Response = jsonify({"entry": "valid"})
        print(request.get_json())
    else:
        Response = jsonify({"entry": "invalid"})
    return Response
    
@app.route('/call/cart', methods = ['POST'])
def add_to_cart():
    print("Adding ITem to cart")
    item = request.get_json()
    print(item)
    item_id = ses.query(USER).filter(USER.username==item["user"]).first()
    item_id = ses.query(CUSTOMER).filter(CUSTOMER.user_id == item_id).first()
    print(item_id.id)#type: ignore
    status = adding_to_cart(item_id.id,item["p_id"],item["quantity"],ses) #type: ignore
    print(status)
    ses.commit()
    return status

@app.route('/show_cart/<username>',methods = ['GET'])
def show_cart(username):
    # Fetch the user_id for the given username
    user = ses.query(USER).filter(USER.username == username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_id = user.id

    # Join the CART and PRODUCT tables on the condition that PRODUCT.id matches CART.product_id
    joint_table = (ses.query(CART, PRODUCT)
                   .join(PRODUCT, CART.product_id == PRODUCT.id)
                   .filter(CART.customer_id == user_id)
                   .all())

    # Extract the required information and prepare the output
    output = [{"username": username, 
               "name": product.name, 
               "description": product.description, 
               "price": product.price, 
               "quantity": cart.quantity} for cart, product in joint_table]

    # Return the output as JSON
    return jsonify(output)

@app.route('/show_details/<username>', methods=['GET'])
def show_details(username):
    ses.rollback()
    print("Request Accpeted ,Showing Details")
    user = ses.query(USER).filter(USER.username == username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    user_id = user.id
    customer = ses.query(CUSTOMER).filter(CUSTOMER.user_id == user_id).first()
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    output = {"username": username, "contact": customer.contact, "address": customer.address, "email": user.email, "full_name": user.full_name}
    return jsonify(output)

@app.route('/change_details', methods=['PATCH'])
def change_details():
    ses.rollback()
    print("Request Accpeted ,Changing Details")
    details=request.get_json()
    user_name = details['username']
    password = details['key']
    user_id = ses.query(USER).filter(USER.username == details['username']).first().id #type: ignore
    if(details['new_contact']!=""):
        ses.query(CUSTOMER).filter(CUSTOMER.user_id == user_id).update({"contact": details['new_contact']})
    if(details['new_address']!=""):
        ses.query(CUSTOMER).filter(CUSTOMER.user_id == user_id).update({"address": details['new_address']})
    if(details['new_email']!=""):
        ses.query(CUSTOMER).filter(CUSTOMER.user_id == user_id).update({"email": details['new_email']})
    if(details['new_full_name']!=""):
        ses.query(USER).filter(USER.id == user_id).update({"full_name": details['new_full_name']})
    if(details['new_password']!=""):
        new_password = ph.hash_password(details['new_password'])
        ses.query(USER).filter(USER.id == user_id).update({"password": new_password})
        password = new_password
    if(details['new_username']!=""):
        ses.query(USER).filter(USER.id == user_id).update({"username": details['new_username']})
        user_name = details['new_username']
    print(details)
    ses.commit()
    timestamp = datetime.datetime.now()
    role = "customer"
    payload = {"username": user_name, "key":password ,"timestamp": str(timestamp) , "role" : role} # type: ignore
    new_token = tokens.generate_token(payload)
    Response = jsonify({"username": user_name, "key": password, "timestamp": str(timestamp), "role": "customer"})
    Response.headers["Authorization"] = new_token
    Response.headers["Access-Control-Expose-Headers"] = "Authorization"
    return Response


@app.route('/checkout', methods=['PUT'])
def checkout():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token is missing'}), 403
    request_data = request.get_json()
    payload = tokens.validate_token(token)
    username = request_data.get('username')
    password = request_data.get('key')
    if username != payload["username"] or password != payload["key"]: #type: ignore
        return jsonify({'error': 'Invalid credentials'}), 403
    user = ses.query(USER).filter(USER.username == username).one()
    user_id = user.id
    customer_id = ses.query(CUSTOMER).filter(CUSTOMER.user_id == user_id).one().id
    cart_entries = ses.query(CART).filter(CART.customer_id == customer_id).all()
    for entry in cart_entries:
        ses.query(PRODUCT).filter(PRODUCT.id == entry.product_id).update({PRODUCT.quantity: PRODUCT.quantity - entry.quantity})
        ses.delete(entry)
    ses.commit()
    return {"entry": "success"}

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)