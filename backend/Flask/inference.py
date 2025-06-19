import os
import json
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
print("done")
from models.multimodalTransformer import MultiModalTransformer
print("done1")
from models.GNN import GNN, MultiGNN, getVSG, getVSGInference, getPyVSG, getTSG, getPyTSG, emptyVSG, getCMSG1, getCMSG2, getCMSG3


if (torch.cuda.is_available()):
    device = torch.device("cuda")
    print("Running on the GPU")
else:
    device = torch.device("cpu")
    print("Running on the CPU")


class MultiModalClassifier(nn.Module):
    # 768, 8, 2048, 0.1, GNN_DIM
    def __init__(self, d_model, num_heads, d_ff, dropout, gnn_dim):
        super(MultiModalClassifier, self).__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_ff = d_ff
        self.dropout = dropout
        
        self.transformer = MultiModalTransformer(d_model, num_heads, d_ff, dropout)
        self.GNN = GNN(gnn_dim)
        self.classifier = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(d_model+64, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128,32),
            nn.ReLU(),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )
        
    def forward(self, text_batch, image, data_visual):
        x = self.transformer(text_batch, image)
        x_graph = self.GNN(data_visual)
        
        # Concatenate the outputs
        x_combined = torch.cat((x, x_graph), dim=1)
        
        x = self.classifier(x_combined)
        return x


transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()              
])


# loading the model state dicts
def load_model(model, modelPath):
    model.load_state_dict(torch.load(modelPath))
    return model


NODE_EMBEDDING_SIZE = 100
GNN_DIM = NODE_EMBEDDING_SIZE
model = MultiModalClassifier(768, 8, 2048, 0.1, GNN_DIM)
model = load_model(model, "./elections-1.pth")
model.to(device)


def MFND_Inference(text, ImgPath):

    threshold = 0.5
    length = 10001
    placeholder_image = torch.zeros((1, 3, 256, 256))

    # Loading the Image
    if os.path.exists(ImgPath):
        try:
            image = Image.open(ImgPath)
            if(image.mode != 'RGB'):
                    image = image.convert('RGB')
            image = transform(image)
            image = image.unsqueeze(0)
        except:
            image = placeholder_image
    else:
        return "Image not found"          


    # Getting VSG
    try:
        vsg = getVSGInference(ImgPath)
        data_vsg = getPyVSG(vsg)
    except Exception as e:
        print(f"Error processing image file: {str(e)}")
        print("Taking Empty VSG")
        vsg = emptyVSG()
        data_vsg = getPyVSG(vsg)


    data_vsg = data_vsg.to(device)
    
    output = model([text], image, data_vsg)

    return output

     
    


print(MFND_Inference("This is a sample text", "figures/task.png"))


