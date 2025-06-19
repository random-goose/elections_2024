from Fake_news.inference import MFND_Inference
import os
from flask_mail import Message
from config import mail

def process_Fakenews(image_path, text, email):

    result = MFND_Inference( text,image_path)
    
    msg = Message('Your Prediction Result', sender='electiondashboard1@gmail.com', recipients=[email])
    msg.body = f'Your prediction result is: {result}'
    
    with open(image_path, 'rb') as img_file:
        msg.attach(os.path.basename(image_path), 'image/jpeg', img_file.read())

    mail.send(msg)

    # Clean up the uploaded image
    os.remove(image_path)
    return result
