// Animated counters
function animateCounters() {
    const members = document.getElementById('membersCount');
    const calls = document.getElementById('callsCount');
    const tips = document.getElementById('tipsCount');
    
    const targetMembers = 1284;
    const targetCalls = 47;
    const targetTips = 3200;
    
    animateValue(members, 0, targetMembers, 2000);
    animateValue(calls, 0, targetCalls, 2000);
    animateValue(tips, 0, targetTips, 2000);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Copy address functionality
function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        // Show copy confirmation
        const event = new CustomEvent('showToast', { 
            detail: { message: 'Address copied to clipboard! 📋' }
        });
        document.dispatchEvent(event);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Live tip feed updates
function updateTipFeed() {
    const tips = [
        '🟢 @crypto_whale tipped 0.5 ETH',
        '🟢 @degen_szn tipped 1000 USDC',
        '🟢 anon tipped 0.1 BTC',
        '🟢 @web3_builder tipped 500 BNB',
        '🟢 @alpha_hunter tipped 2000 USDT',
        '🟢 anon tipped 0.05 BTC',
        '🟢 @trading_god tipped 2.5 ETH'
    ];
    
    const feed = document.getElementById('tipFeed');
    
    setInterval(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const newItem = document.createElement('div');
        newItem.className = 'feed-item';
        newItem.textContent = randomTip;
        
        feed.insertBefore(newItem, feed.firstChild);
        if (feed.children.length > 5) {
            feed.removeChild(feed.lastChild);
        }
    }, 5000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    updateTipFeed();
    
    // Add click sound to buttons
    const buttons = document.querySelectorAll('button, .wallet-card, .glow-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const clickSound = document.getElementById('clickSound');
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
});

// Toast notification system
document.addEventListener('showToast', function(e) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00ff00;
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
    `;
    toast.textContent = e.detail.message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
});
