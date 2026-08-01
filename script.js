// DATABASE: Add your announcements here. Newest goes at the top!
const announcements = [
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

// FUNCTION: Render announcements automatically to the webpage feed
function displayAnnouncements() {
    const feedContainer = document.getElementById('announcements-list');
    
    // Clear out placeholder contents
    feedContainer.innerHTML = '';
    
    // Check if there are no posts logged in the database array
    if (announcements.length === 0) {
        feedContainer.innerHTML = '<p style="color: var(--text-muted);">No announcements posted yet.</p>';
        return;
    }
    
    // Loop through the array data structures to inject custom cards into HTML DOM layout
    announcements.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'announcement-card';
        
        postCard.innerHTML = `
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
        
        feedContainer.appendChild(postCard);
    });
}

// Execute display render routine once DOM scripts finish booting up
document.addEventListener('DOMContentLoaded', displayAnnouncements);
