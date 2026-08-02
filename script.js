// ==========================================
// NICOSMP SEASON 3 - FORUMS ENGINE CORE
// ==========================================

// 🚀 REVISE THIS TARGET WITH YOUR DISCORD WEBHOOK URL OUT OF THE SERVER SETTINGS:
const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

// Default system announcements array fallback
const defaultAnnouncements = [
    {
        title: "Season 3 Launch & Store Open!",
        date: "August 1, 2026",
        author: "Nico",
        content: "Welcome to Season 3! The server is officially live and fully optimized. We have added brand new custom reward crates at spawn and fully balanced our player economy. Check out the official store link above to support the server grind!"
    },
    {
        title: "Welcome to the New NicoSMP Bulletin Board",
        date: "July 31, 2026",
        author: "Nico",
        content: "This is our official home for server news, changes, updates, and general information. Stay tuned here for all patch notes regarding Season 3 development."
    }
];

// Handles the tab rendering routing swaps
function setupTabRouting() {
    const tabAnnounce = document.getElementById('tab-announcements');
    const tabTickets = document.getElementById('tab-tickets');
    const viewAnnounce = document.getElementById('view-announcements');
    const viewTickets = document.getElementById('view-tickets');
    const viewAdmin = document.getElementById('admin-panel');

    if (!tabAnnounce || !tabTickets) return;

    tabAnnounce.addEventListener('click', () => {
        tabAnnounce.classList.add('active');
        tabTickets.classList.remove('active');
        viewAnnounce.classList.remove('hidden');
        viewTickets.classList.add('hidden');
        viewAdmin.classList.add('hidden'); // Close administrative portal if open
    });

    tabTickets.addEventListener('click', () => {
        tabTickets.classList.add('active');
        tabAnnounce.classList.remove('active');
        viewTickets.classList.remove('hidden');
        viewAnnounce.classList.add('hidden');
        viewAdmin.classList.add('hidden');
    });

    // Secret dashboard toggle handler
    const secretTrigger = document.getElementById('secret-dashboard-trigger');
    if (secretTrigger) {
        secretTrigger.addEventListener('click', () => {
            viewAdmin.classList.toggle('hidden');
            viewAnnounce.classList.add('hidden');
            viewTickets.classList.add('hidden');
            tabAnnounce.classList.remove('active');
            tabTickets.classList.remove('active');
            viewAdmin.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Loads announcements out of local storage history loop arrays
function loadAnnouncements Feed() {
    const container = document.getElementById('announcements-list');
    if (!container) return;

    // Grab custom arrays or load system fallbacks
    let currentPosts = localStorage.getItem('nicosmp_posts');
    if (!currentPosts) {
        localStorage.setItem('nicosmp_posts', JSON.stringify(defaultAnnouncements));
        currentPosts = JSON.stringify(defaultAnnouncements);
    }

    const posts = JSON.parse(currentPosts);
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: var(--muted); font-weight: 500;">No articles compiled to data tables yet.</p>';
        return;
    }

    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'announcement-card';
        article.innerHTML = `
            <div class="announcement-header">
                <h3>${post.title}</h3>
                <div class="meta-info">
                    <span class="author-tag">👑 ${post.author}</span>
                    <span>${post.date}</span>
                </div>
            </div>
            <div class="announcement-body">
                <p>${post.content}</p>
            </div>
        `;
        container.appendChild(article);
    });
}

// Handles dashboard submission loops directly into LocalStorage memory layouts
function setupAdminDashboard() {
    const form = document.getElementById('admin-form');
    const clearBtn = document.getElementById('admin-reset');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('admin-title').value;
        const author = document.getElementById('admin-author').value;
        const body = document.getElementById('admin-body').value;
        
        const rawDate = new Date();
        const formattedDate = rawDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        const newPost = { title, date: formattedDate, author, content: body };

        // Pull down existing logs array tracking records
        let posts = JSON.parse(localStorage.getItem('nicosmp_posts') || '[]');
        posts.unshift(newPost); // Drop it in at index position 0

        localStorage.setItem('nicosmp_posts', JSON.stringify(posts));
        form.reset();
        
        // Go straight back to dashboard home views
        loadAnnouncementsFeed();
        document.getElementById('tab-announcements').click();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear the posts dataset completely back to system defaults?")) {
                localStorage.removeItem('nicosmp_posts');
                loadAnnouncementsFeed();
                document.getElementById('tab-announcements').click();
            }
        });
    }
}

// Dispatches user tickets straight through to staff chat logs on Discord
function setupTicketPipeline() {
    const form = document.getElementById('ticket-form');
    const statusText = document.getElementById('ticket-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = document.getElementById('ticket-user').value;
        const type = document.getElementById('ticket-type').value;
        const msg = document.getElementById('ticket-msg').value;

        statusText.style.color = "var(--text)";
        statusText.textContent = "Processing transmission array protocols...";

        // Set up the ticket category name string
        let typeLabel = "Support Request";
        if (type === "staff_app") typeLabel = "Staff Application";
        if (type === "bug_report") typeLabel = "Bug / Exploit Exploded Log";
        if (type === "player_report") typeLabel = "Player Abuse Escalation";

        // Structured JSON payload block for Discord embed channels
        const discordPayload = {
            embeds: [{
                title: `🛡️ NEW FORUM TICKET: ${typeLabel}`,
                color: 16769871, // Matches the yellow accent hex decimal system code value
                fields: [
                    { name: "Minecraft IGN", value: `\`${user}\``, inline: true },
                    { name: "Ticket Mode Category", value: typeLabel, inline: true },
                    { name: "Application / Message Details", value: msg }
                ],
                footer: { text: "NicoSMP Forums Dispatch System Engine" },
                timestamp: new Date().toISOString()
            }]
        };

        if (DISCORD_WEBHOOK_URL === "YOUR_DISCORD_WEBHOOK_URL_HERE") {
            statusText.style.color = "var(--danger)";
            statusText.textContent = "❌ ERROR: Webhook URL is unconfigured in script.js. Staff cannot receive this yet.";
            return;
        }

        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        })
        .then(() => {
            statusText.style.color = "#00aa00";
            statusText.textContent = "✓ Success! Ticket transmitted to the staff triage chat on Discord.";
            form.reset();
        })
        .catch(err => {
            console.error("Transmission glitch: ", err);
            statusText.style.color = "var(--danger)";
            statusText.textContent = "❌ Network connection dropped. Submission failed.";
        });
    });
}

// Queries real-time network states from public API stacks
function checkRuntimeStatus() {
    const ip = "play.nicosmp.net";
    const dot = document.querySelector('.status-indicator .status-dot');
    const text = document.querySelector('.status-indicator p');

    if (!dot || !text) return;

    fetch(`https://api.mcsrvstat.us/3/${ip}`)
        .then(res => res.json())
        .then(data => {
            if (data.online) {
                dot.classList.add('online');
                text.innerHTML = `NODE: <b>ONLINE</b> <span style="color:#00aa00;">(${data.players.online} active)</span>`;
            } else {
                dot.classList.remove('online');
                text.innerHTML = `NODE: <span style="color:var(--danger); font-weight:700;">OFFLINE</span>`;
            }
        })
        .catch(() => {
            dot.classList.remove('online');
            text.innerHTML = `NODE: <span style="color:var(--danger);">PING TIMEOUT</span>`;
        });
}

// Execution triggers on layout mounting routines
document.addEventListener('DOMContentLoaded', () => {
    setupTabRouting();
    loadAnnouncementsFeed();
    setupAdminDashboard();
    setupTicketPipeline();
    checkRuntimeStatus();
});
