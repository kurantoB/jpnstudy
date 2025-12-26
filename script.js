const STATUS_ID = 'status';
const OUTPUT_ID = 'output';
const SOURCE_URL = 'https://raw.githubusercontent.com/kurantoB/jpnstudy/refs/heads/master/jpn.json';

const statusEl = document.getElementById(STATUS_ID);
const outputEl = document.getElementById(OUTPUT_ID);

async function loadJpnJson() {
    try {
        statusEl.textContent = 'Fetching JSON...';
        const res = await fetch(SOURCE_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        outputEl.textContent = JSON.stringify(data, null, 2);
        statusEl.textContent = 'Loaded';
    } catch (err) {
        statusEl.textContent = 'Failed to load JSON';
        outputEl.textContent = String(err);
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', loadJpnJson);