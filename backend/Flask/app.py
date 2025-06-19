from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import base64
import uuid
import smtplib
import threading
from queue import Queue
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class DummyModel:
    def process(self, image_path):
        import time
        time.sleep(10)  
        return "dummy_classification_result"

dummy_model = DummyModel()

task_queue = Queue()

def process_image(image_path, email):
    try:
        classification_result = dummy_model.process(image_path)
        print(f"Image processed: {image_path}. Result: {classification_result}")

        send_email_with_attachment(email, image_path, classification_result)

        os.remove(image_path)
    except Exception as e:
        print(f"Error processing image: {str(e)}")

def send_email_with_attachment(email, image_path, result):
    try:
        sender_email = 'electiondashboard@gmail.com' 
        receiver_email = email
        password = 'mofu hxcj wryc rjnc'  
        subject = 'Image Classification Result'
        body = f"Classification Result: {result}"

        message = EmailMessage()
        message['From'] = sender_email
        message['To'] = receiver_email
        message['Subject'] = subject
        message.set_content(body)

        with open(image_path, 'rb') as f:
            image_data = f.read()
            message.add_attachment(image_data, maintype='image', subtype='jpeg', filename=os.path.basename(image_path))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(sender_email, password)
            smtp.send_message(message)
        
        print(f"Email sent to {receiver_email} with image attachment and result: {result}")

    except Exception as e:
        print(f"Error sending email: {str(e)}")

def worker():
    while True:
        task = task_queue.get()  
        process_image(*task)
        task_queue.task_done()

@app.route('/FramePRediction', methods=['POST'])
def handle_post():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name = data.get('name')
    frame = "miscellaneous"

    if not name:
        return jsonify({'error': 'Missing Sentence'}), 400

    response = {'Frame': f'{frame}!'}

    return jsonify(response), 200

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files or 'email' not in request.form:
            return jsonify({"status": "error", "message": "Image file or email not provided"}), 400

        file = request.files['image']
        email = request.form['email']

        if file.filename == '':
            return jsonify({"status": "error", "message": "No selected file"}), 400

        if file and email:
            filename = str(uuid.uuid4()) + '.jpg'
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            task_queue.put((filepath, email))

            return jsonify({"status": "success", "message": "File uploaded and scheduled for processing", "filename": filename})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    worker_thread = threading.Thread(target=worker)
    worker_thread.start()

    app.run(debug=True)
