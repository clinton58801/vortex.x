// pages/api/search.js

import { cosineSimilarity } from '../../utils/cosine';
import { embedText } from '../../utils/embedding';

let vectorStore = [
  {
    text: "Vortex.X is an AI suite with agents like CodeForge, ChatBrain, and FileBrain.",
    embedding: [], // will be generated on boot
  },
  {
    text: "Users can upgrade to Pro or Premium tiers via PayPal.",
    embedding: [],
  },
  {
    text: "CodeForge executes live code in Python and JavaScript.",
    embedding: [],
  }
];

// Preprocess: generate embeddings for vector store
(async () => {
  for (let i = 0; i < vectorStore.length; i++) {
    vectorStore[i].embedding = await embedText(vectorStore[i].text);
  }
})();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) return res.status(400).json({ error: 'Missing search query.' });

  const queryEmbedding = await embedText(query);

  let bestMatch = null;
  let bestScore = -Infinity;

  for (const item of vectorStore) {
    const score = cosineSimilarity(queryEmbedding, item.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    return res.status(200).json({
      result: bestMatch.text,
      confidence: bestScore,
    });
  } else {
    return res.status(404).json({ error: 'No relevant result found.' });
  }
}
