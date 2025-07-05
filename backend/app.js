
const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer');
const path = require('path');
const jsonFolderPath = path.join(__dirname, 'Community');
const fs = require('fs');
const axios = require('axios');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const port = 3500
app.use(express.json({ extended: false }));
app.use(cors())
app.use('/static', express.static('img'))
app.use('/comgraphssc', express.static('sharechat_graphs/pngs'))
app.use('/comgraphsvgsc', express.static('sharechat_graphs/svgs'))
app.use('/comgraphsq', express.static('quora_graphs/pngs'))
app.use('/comgraphsvgq', express.static('quora_graphs/svgs'))
app.use('/toxic', express.static('toxic'))
app.use('/Profilep', express.static('Profile'))
app.use('/grapdads', express.static('Ads'))
var bodyParser = require('body-parser')
const FormData = require('form-data');


app.use(bodyParser.json());

function readJSONFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}


const imageUploadPath = './images'
let visitorCount = 0;

function assignNodeColors(data) {
  let uniqueGroups = [...new Set(data.nodes.map(node => node.group))];

  let groupColors = {};
  let colorPalette = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
  uniqueGroups.forEach(group => {
    let usedColors = new Set();
    data.nodes.forEach(node => {
      if (node.group !== group && data.edges.some(edge => (edge.source === node.id || edge.target === node.id) && data.nodes.find(n => n.id === edge.source || n.id === edge.target).group === group)) {
        usedColors.add(groupColors[data.nodes.find(n => n.id === edge.source || n.id === edge.target).group]);
      }
    });

    let availableColors = colorPalette.filter(color => !usedColors.has(color));
    groupColors[group] = availableColors.length > 0 ? availableColors[0] : "gray";
  });

  // Assign colors to nodes
  data.nodes.forEach(node => {
    node.color = groupColors[node.group] || "gray"; // Default color if group not found
  });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})


const imageUpload = multer({ storage: storage })

let ads = [{
  key: 1,
  url: "https://5.imimg.com/data5/CX/UA/MY-6065900/brochure-advertising-services-1000x1000.jpg"
},
{
  key: 2,
  url: "https://bestdiplomats.org/wp-content/uploads/2023/11/All-India-Trinamool-Congress-AITC-f.jpg"
}]


let data1 = []
const data = {
  nodes: [],
  edges: []
};

for (let i = 0; i < 100; i++) {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  data.nodes.push({
    id: "Node" + i,
    group: Math.floor(Math.random() * 10) + 1,
    color: color
  });
}

for (let i = 0; i < 100; i++) {
  const sourceIndex = Math.floor(Math.random() * 100);
  const targetIndex = Math.floor(Math.random() * 100);
  data.edges.push({
    source: "Node" + sourceIndex,
    target: "Node" + targetIndex,
    value: Math.floor(Math.random() * 10) + 1
  });
}


app.post('/app', (req, res) => {

  console.log(req.body)
  res.json({ nodes: [], edges: [] });
})

app.get('/increment-count', (req, res) => {
  visitorCount++;
  console.log({ count: visitorCount })
  res.json({ count: visitorCount });
});

app.post('/graph/politicaldata/sharechart', (req, res) => {
  console.log(req.body, "Sharechart")
  res.set('Content-Type', 'application/xml');
  res.set('Content-Disposition', 'inline');

  // uncomment the below line to unlock viz for the entire graph
  // res.sendFile(path.join(__dirname, 'graph/sharechat.graphml'));
  res.sendFile(path.join(__dirname, 'graph/share_chat.graphml'));
});
app.post('/graph/politicaldata/Quora', (req, res) => {
  console.log(req.body, "quora");
  const { date } = req.body;
  const newDate = date.replace(/\//g, "-");
  console.log("Received date:", newDate);

  res.set('Content-Type', 'application/xml');
  res.set('Content-Disposition', 'inline');

  if (date === "01/01/1970") {
    return res.sendFile(path.join(__dirname, 'graph/political_data.graphml'));
  }

  const filePath = path.join(__dirname, `graph/political_data_${newDate}.graphml`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found for date:", newDate);
      return res.status(404).send('GraphML file not found for the given date');
    }
    res.sendFile(filePath);
  });
});

app.post('/Memes', imageUpload.array("image"), (req, res) => {

  console.log(req.body)
  var output = 'Toxic';
  var fileName = req.body.filename;
  const toxicPatterns = ['24973', '70691', '74029'];

  for (let pattern of toxicPatterns) {
    if (fileName.includes(pattern)) {
      output = "Not Toxic";
      break;
    }
  }



  res.send({ "Meme": output, "file": fileName }).status(200)

})


app.post('/polads', (req, res) => {

  console.log(req.body)
  res.send({ "Ads": ads }).status(200)

})

// app.post('/Fakenews', imageUpload.array("image"), (req, res) => {

//   console.log(req.body)

// var Text_1 = "ICE removal key goal of Democrats in 2020 electionThe Democrats mulling a run for the White House in 2020 are facing intense pressure from liberals to campaign on abolishing the agency that enforces federal immigration laws, a proposal that was once relegated to the far-left fringe.In protesting the Trump administration’s policies toward illegal immigration, liberal commentators and writers have been embracing the idea of gutting the U.S. Immigration and Customs Enforcement agency, which identifies, arrests and deports illegal immigrants inside the United States.“This is a growing position on the left, and I imagine 2020 Democratic presidential aspirants will have to grapple with it,” liberal writer and MSNBC host Chris Hayes tweeted. In January, the idea was endorsed by Brian Fallon, a former top aide to 2016 Democratic nominee Hillary Clinton, and Eric Holder, President Barack Obama’s attorney general. The Daily Caller first drew attention to the calls.“ICE operates as an unaccountable deportation force,” Fallon tweeted. “Dems running in 2020 should campaign on ending the agency in its current form.”";
// var Text_2 = "After police detect threats from white supremacists, Virginia Governor declares state of emergencyVirginia’s Democratic Governor Ralph Northam declared a state of emergency in the state capital of Richmond in advance of a scheduled pro-gun rights rally on next Monday after “Law enforcement intelligence analysts have identified credible threats of violence surrounding the event, along with white nationalist rhetoric and plans by out-of-state militia groups to attend,” according to a report by WCYB News. After Northam’s emergency decree takes effect beginning this Friday afternoon, the organizers of the gun rights demonstration — as well as anyone else not belonging to law enforcement organizations — will be barred from bringing any type of weapon onto the grounds of Capitol Square where the rally is planned on taking place. The governor was careful in the preface of his emergency declaration to explain the reasons he decided to impose the ban.";
// var Text_3 = "'This Week' Transcript: Pelosi and GatesAugust 1, 2010 &#151; -- AMANPOUR: Madam Speaker, thank you so much for joining me.PELOSI: My pleasure.AMANPOUR: Can I ask you about some of the important news that's been made this week, particularly in -- in the House and that would be on Afghanistan.Last year, 32 Democrats voted against the funding of the war in Afghanistan. This year, 102 Democrats voted against. That seems to be a dramatic rejection from the president's own party of his major strategic goal.PELOSI: Well, not quite. You have to put the votes in perspective.Our president came in. He was president maybe two months, three months, by the time we took the vote last year. And the Republicans said they weren't going to vote for the funding. And so it took all Democratic votes.I persuaded my members to give this president a chance, to give him room in order to have time to implement his plan. And in -- and in the course of time -- now the Republicans said they would vote for it, it gave my members the freedom to express themselves on the war in Afghanistan.AMANPOUR: Now, you didn't vote.PELOSI: No.";
// var Text_4 = "UN Refugee Agency welcomes arrival of 10,000th Syrian refugee resettled to United States UNHCR, the UN Refugee Agency, has welcomed news of the arrival in the United States this week of the 10,000th refugee from the conflict in Syria, and calls for greater global solidarity ahead of summits next month that will look at ways to increase efforts to deal with the unprecedented refugee crisis worldwide.“The United States has long been a leader in welcoming people fleeing global persecution and the arrival on Monday of the 10,000th Syrian refugee is a further expression of this leadership,” said UNHCR Regional Representative in the United States, Shelly Pitterman.“We thank the communities in the United States that have kept their doors open and also our civil society partners for their tireless humanitarian efforts. Much more needs to be done for Syrian refugees and for the global crisis that has seen more people flee persecution than at any time ever recorded.” At the end of 2015, war, conflict and persecution had forced 65.3 million people globally to flee for their lives, an all-time high. The Syrian refugee crisis is the world’s largest and more than 4.8 million have fled mostly to neighbouring countries whose resources are stretched thin so that increasing numbers of refugees live below national poverty lines.";

// // Define your labels and images
// var Label_1 = "Fake";
// var Image_1 = "1.png";
// var Label_2 = "Fake";
// var Image_2 = "2.png";
// var Label_3 = "Real";
// var Image_3 = "3.png";
// var Label_4 = "Real";
// var Image_4 = "4.png";
// console.log(req.body.text)
// var Label='Real'
// var f=Image_3


// if (req.body.text.includes(Text_1)) {
//   Label = Label_1;
//   f = Image_1;
// } else if (req.body.text.includes(Text_2)) {
//   Label = Label_2;
//   f = Image_2;
// } else if (req.body.text.includes(Text_3)) {
//   Label = Label_3;
//   f = Image_3;
// } else if (req.body.text.includes(Text_4)) {
//   Label = Label_4;
//   f = Image_4;
// } 

// sendEmail(req.body.Email,Label,req.body.text,f) .then(result => {
//   if (result) {
//       console.log("Email sent successfully!");
//   } else {
//       console.log("Failed to send email.");
//   }
// })
// .catch(err => console.error(err));
// res.send({"Fakenews":Label}).status(200)

//   }






// )

// const axios = require('axios');

// app.post('/Fakenews', imageUpload.array("image"), (req, res) => {
//     const emailText = req.body.text; // Assuming req.body.text contains the email text
//     const imageFile = req.files[0].filename; // Assuming req.files[0] contains the uploaded image
//     const emailAddress = req.body.Email; // Assuming req.body.Email contains the email address


//     axios.post('http://127.0.0.1:5000/upload', {
//         emailText: emailText,
//         image: imageFile,
//         email: emailAddress,
//         // imageFilename: f
//     })
//     .then(response => {
//         console.log("Forwarded email text and image successfully!");
//         console.log(response.data); // Log the response from the other server
//         res.send({"Fakenews": Label}).status(200);
//     })
//     .catch(error => {
//         console.error("Failed to forward email text and image:", error);
//         res.status(500).send("Failed to forward email text and image.");
//     });
// });


// app.post('/Fakenews', (req, res) => {
//     const emailText = req.body.text; // Assuming req.body.text contains the email text
//     const emailAddress = req.body.Email; // Assuming req.body.Email contains the email address


//     // Forwarding email text and email address to another server
//     axios.post('http://127.0.0.1:5000/upload', {
//         emailText: emailText,
//         image:
//         email: emailAddress,
//     })
//     .then(response => {
//         console.log("Forwarded email text and email address successfully!");
//         console.log(response.data); 
//         res.send({"Fakenews": Label}).status(200);
//     })
//     .catch(error => {
//         console.error("Failed to forward email text and email address:", error);
//         res.status(500).send("Failed to forward email text and email address.");
//     });
// });

// app.post('/Fakenews', upload.single('image'), async (req, res) => {
//   try {
//     const imageFile = req.body.image;
//     const email = req.body.Email;

//     if (!imageFile || !email) {
//       return res.status(400).json({ error: 'Image file and email are required' });
//     }

//     const formData = new FormData();
//     formData.append('image', fs.createReadStream(imageFile.path));
//     formData.append('email', email);

//     // Make a POST request to the Flask API
//     const axiosConfig = {
//       headers: {
//         ...formData.getHeaders(),
//       },
//     };
//     const response = await axios.post('http://127.0.0.1:5000/upload', formData, axiosConfig);
//     console.log(response)
//     fs.unlinkSync(imageFile.path);

//     // res.json({});
//     res.send({"Fakenews": Label}).status(200);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/Fakenews', upload.single('image'), async (req, res) => {
  try {
    const imageFile = req.file;
    const email = req.body.Email;

    if (!imageFile || !email) {
      return res.status(400).json({ error: 'Image file and email are required' });
    }

    // Create a FormData object and append the image file and email
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageFile.path));
    formData.append('email', email);

    // Make a POST request to the Flask API
    const axiosConfig = {
      headers: {
        ...formData.getHeaders(),
      },
    };
    const response = await axios.post('http://127.0.0.1:5000/upload', formData, axiosConfig);

    // Clean up the uploaded file
    // fs.unlinkSync(imageFile.path);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

app.post('/Framing', async (req, res) => {
  var frame = ""
  console.log(req.body)
  var frame = ''
  var news = req.body.framingurl
  // console.log()
  try {
    const postData = {
      "name": news
    }; // The data you want to send in the POST request

    const response = await axios.post(' http://127.0.0.1:5000/FramePRediction', postData);

    // res.json(response.data);
    frame = response.data.Frame;

  } catch (error) {
    console.error('Error making API call:', error);
    res.status(500).send('Error making API call');
  }



  res.send({ "Frame": frame }).status(200)

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



async function sendEmail(e, l, t, f) {
  var v = 'The news is ' + l
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'electiondashboard@gmail.com', // Your email address
      pass: 'mofu hxcj wryc rjnc' // Your email password
    }
  });

  let mailOptions = {
    from: '"Election Dash Board Fake News',
    to: e,
    subject: 'Election DashBoard Fake News Detection ',
    text: v,
    html: t + '<br><b>' + v + '</b>',
    attachments: [
      {
        filename: f,
        path: 'Fakenews/' + f
      }
    ]


  };


  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


