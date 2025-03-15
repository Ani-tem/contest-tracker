import pool from './db.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function fetchAndStoreContests() {
  try {
    const url = 'https://clist.by/api/v2/contest/';
    const params = {}; // No filters


    const response = await axios.get(url, {
      params,
      headers: {
        'Authorization': 'ApiKey Aniem:6781473eac559053887bcc01cda341d37935ee29'
      }
    });

    const contests = response.data.objects;
    for (const contest of contests) {
      const contestName = contest.event;
      const platform = contest.resource ? contest.resource.name : 'Unknown';
      const startTime = contest.start;
      const endTime = contest.end;
      const contestUrl = contest.href;

      await pool.query(
        `INSERT INTO contests (name, platform, start_time, end_time, url)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (name) DO NOTHING`,
        [contestName, platform, startTime, endTime, contestUrl]
      );
    }
    console.log('Contests updated from Clist API.');
  } catch (error) {
    console.error('Error fetching contests from Clist API:', error.message);
  }
}

export default fetchAndStoreContests;
