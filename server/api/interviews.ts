import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  const interviews = JSON.parse(readFileSync('./public/content/interviews.json'));
  return interviews.map((interview) => ({
    ...interview,
    Transcription: [
      interview.Transcription,
      interview['Transcription 2'],
    ].filter(v => !!v).join('\n')
  }));
});
