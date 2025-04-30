import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import express from "express";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer"
import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 */
async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

/**
 * Waits for the given files to be processed until they are active.
 */
async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw new Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


async function generateResponse(filePath, mimeType) {
  const files = [await uploadToGemini(filePath, mimeType)];
  await waitForFilesActive(files);

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          { text: "ats score of this resume\n" },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Initial model response placeholder..." },
        ],
      },        
    ],
  });

  const result = await chatSession.sendMessage("give this resume feedback weakness and strength in 5 points and last show the ats score also show it in the table with category points and feedback");
  return result.response.text();
}


app.post("/generate", upload.single("pdf"), async (req, res) => {
  try {
    
    // console.log(req)
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const resultText = await generateResponse(filePath, mimeType);
    res.json({ result: resultText });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function sendMail(name,email){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Your Feedback!',
    html: fs.readFileSync('feedback.html', 'utf8') 
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending mail:', error);
    }
    console.log('Email sent: ',);
  });
  
  
  
}

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  sendMail(name, email);
  res.send("done");
});



const USERS_FILE = './users.json';

const readUsers = () => {
  const data = fs.existsSync(USERS_FILE) ? fs.readFileSync(USERS_FILE) : '[]';
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};



function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  let users = readUsers();
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { name, email, password };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: 'User registered successfully' });
});


// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ user });
});

app.listen(5000, () => console.log("App is running on port 5000"));
