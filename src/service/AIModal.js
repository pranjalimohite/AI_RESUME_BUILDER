// src/service/AIModal.js

export const AIChatSession = {
  async sendMessage(prompt) {
    // You may want to parse the prompt to extract jobTitle and experience
    // For now, we'll just send the whole prompt as jobTitle and 'auto' as experience
    const response = await fetch('http://localhost:5000/api/resume/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobTitle: prompt,
        experience: 'auto',
      }),
    });
    return { response };
  }
}; 