var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.options('*', cors());

var routerChat = express.Router();
const { Configuration, OpenAIApi } = require("openai");

routerChat.post('/check2', (req,res,next)=>{
  res.json('it work')
})

routerChat.post('/chatgpt', async (req,res,next)=>{
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);
  const history = [];
  const user_input = req.messages;

  const messages = [];
  for (const [input_text, completion_text] of history) {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  messages.push({ role: "user", content: user_input });
  console.log(messages);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completion_text = completion.data.choices[0].message.content;
    console.log(completion_text);

    history.push([user_input, completion_text]);
    res.json({
      message: completion_text,
  });

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(401).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
})



module.exports = routerChat