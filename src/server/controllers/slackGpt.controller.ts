import type { NextApiRequest, NextApiResponse } from 'next'
import { MissingFieldError, InternalError } from '../errors';
import { openai } from '@/lib/openAi';

type Body = {
  prompt: string;
};

export const slackGpt = async (req: NextApiRequest, res: NextApiResponse) => {
  const { OPENAI_API_KEY } = process.env;

 
  if (OPENAI_API_KEY === null) {
    throw new MissingFieldError('Missing webhook URI');
  }
 


  try {
  const { prompt } = req.body as Body;


  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  });

  res.status(200).json({ result: response.data.choices[0].text });
}
catch(err){
    // err contains sensitive info
    throw new InternalError();
  }
};
