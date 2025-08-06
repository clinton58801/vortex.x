// deepcore/api/deepSearch.js

import axios from 'axios';
import { summarizeText } from '../../utils/gptSummarizer';

const SEARCH_API_URL = 'https://api.bing.microsoft.com/v7.0/search';
const API_KEY = process.env.BING_API_KEY; // Store this securely in env

export const deepSearch = async (query) => {
  try {
    const searchResponse = await axios.get(SEARCH_API_URL, {
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
      },
      params: {
        q: query,
        count: 5,
        textDecorations: false,
        textFormat: 'Raw',
      },
    });

    const results = searchResponse.data.webPages?.value || [];

    const links = results.map((res) => ({
      name: res.name,
      snippet: res.snippet,
      url: res.url,
    }));

    const combinedSnippets = links.map((l) => l.snippet).join('\n\n');

    const summary = await summarizeText(combinedSnippets);

    return {
      summary,
      sources: links.map((l) => l.url),
    };
  } catch (err) {
    console.error('Deep Search Failed:', err.message);
    return {
      summary: 'Sorry, something went wrong while searching.',
      sources: [],
    };
  }
};
