// Global variables to simulate vulnerable state
let currentUser = null;
let sessionId = 'ABC123DEF456'; // Predictable session ID (Vuln #7)
let users = [
    { id: 1, username: 'admin', password: 'admin', email: 'admin@vulnblog.com', name: 'Administrator' },
    { id: 2, username: 'guest', password: 'guest', email: 'guest@vulnblog.com', name: 'Guest User' },
    { id: 3, username: 'john_doe', password: 'password123', email: 'john@example.com', name: 'John Doe' }
];

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Vulnerable login function (Vuln #3 - SQL Injection, #7 - Auth Failures)
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulate SQL injection vulnerability
    console.log(`Executing SQL: SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
    
    // Vulnerable authentication logic
    if (username.includes("' OR '1'='1") || username.includes("admin' OR")) {
        alert('🔓 SQL Injection successful! Logged in as admin');
        currentUser = { id: 1, username: 'admin', role: 'admin' };
        showLoginStatus();
        return false;
    }
    
    // Check against hardcoded credentials (Vuln #5 - Security Misconfiguration)
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert(`✅ Login successful! Welcome ${user.name}`);
        currentUser = user;
        showLoginStatus();
    } else {
        // Verbose error message (Vuln #5 - Security Misconfiguration)
        alert(`❌ Login failed! Username '${username}' not found or password incorrect. Database query: SELECT * FROM users WHERE username='${username}'`);
    }
    
    return false;
}

// Show login status
function showLoginStatus() {
    if (currentUser) {
        const statusDiv = document.createElement('div');
        statusDiv.innerHTML = `
            <div style="background: #d1fae5; padding: 1rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #10b981;">
                <strong>Logged in as:</strong> ${currentUser.username} (ID: ${currentUser.id})<br>
                <strong>Session ID:</strong> ${sessionId}<br>
                <small>Session expires: Never (Vuln #7 - No session timeout)</small>
            </div>
        `;
        
        // Add to current section
        const activeSection = document.querySelector('.section.active');
        if (activeSection && !activeSection.querySelector('.login-status')) {
            statusDiv.className = 'login-status';
            activeSection.insertBefore(statusDiv, activeSection.firstChild.nextSibling);
        }
    }
}

// Vulnerable search function (Vuln #3 - XSS)
function handleSearch(event) {
    event.preventDefault();
    
    const query = document.getElementById('searchQuery').value;
    const resultsDiv = document.getElementById('searchResults');
    
    // Simulate XSS vulnerability - directly inserting user input
    resultsDiv.innerHTML = `
        <h3>Search Results for: ${query}</h3>
        <div class="search-result">
            <h4>Blog Post: Security Tips</h4>
            <p>Your search term "${query}" was found in this post...</p>
            <small>This demonstrates XSS vulnerability - user input is not sanitized!</small>
        </div>
        <div class="search-result">
            <h4>Comment by user123</h4>
            <p>Great post about ${query}! Thanks for sharing.</p>
        </div>
    `;
    
    // Log the "SQL query" (Vuln #3 - SQL Injection potential)
    console.log(`Executing search SQL: SELECT * FROM posts WHERE content LIKE '%${query}%'`);
    
    return false;
}

// Vulnerable file upload (Vuln #8 - Data Integrity, #10 - SSRF)
function handleUpload(event) {
    event.preventDefault();
    
    const file = document.getElementById('fileUpload').files[0];
    const url = document.getElementById('fileUrl').value;
    
    if (file) {
        // No file validation (Vuln #8)
        alert(`📁 File uploaded: ${file.name} (${file.size} bytes)\n⚠️ No file type validation performed!\nFile could be malicious executable.`);
        console.log('File upload - no security checks performed');
    }
    
    if (url) {
        // SSRF vulnerability (Vuln #10)
        alert(`🌐 Fetching file from URL: ${url}\n⚠️ SSRF vulnerability - server will make request to any URL!\nTry: http://localhost:8080/admin or file:///etc/passwd`);
        console.log(`SSRF attempt: Making server request to ${url}`);
        
        // Simulate server-side request
        setTimeout(() => {
            alert(`📥 Server response from ${url}:\n\n[Simulated response - in real scenario, this could expose internal services]`);
        }, 1000);
    }
    
    return false;
}

// Vulnerable profile update (Vuln #1 - Broken Access Control, #8 - Data Integrity)
function handleProfileUpdate(event) {
    event.preventDefault();
    
    const userId = document.getElementById('profileUserId').value;
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const bio = document.getElementById('profileBio').value;
    
    // IDOR vulnerability - no authorization check (Vuln #1)
    alert(`👤 Profile updated for User ID: ${userId}\n⚠️ No authorization check - you can modify any user's profile!\n\nName: ${name}\nEmail: ${email}\nBio: ${bio}`);
    
    // No input validation (Vuln #8)
    console.log(`Profile update - no input validation for user ${userId}`);
    
    return false;
}

// Broken access control functions (Vuln #1)
function viewUserProfile(userId) {
    // Direct object reference without authorization
    const user = users.find(u => u.id == userId);
    if (user) {
        alert(`👤 User Profile (ID: ${userId})\n\nUsername: ${user.username}\nEmail: ${user.email}\nName: ${user.name}\n\n⚠️ Accessed without authorization check!`);
    }
}

function deleteUser(userId) {
    // No authorization check
    alert(`🗑️ User ${userId} deleted!\n⚠️ No authorization required - anyone can delete users!`);
    console.log(`User ${userId} deleted without authorization`);
}

function viewPost(postId) {
    // Simulate viewing post comments with XSS vulnerability
    const comments = [
        `Great post! <script>alert('XSS in comment')</script>`,
        `Thanks for sharing <img src=x onerror=alert('XSS')>`,
        `Very informative article.`
    ];
    
    alert(`📝 Post ${postId} Comments:\n\n${comments.join('\n\n')}\n\n⚠️ Comments not sanitized - XSS possible!`);
}

// Profile action functions
function exportProfile() {
    // No access control (Vuln #1)
    const profileData = {
        userId: document.getElementById('profileUserId').value,
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        bio: document.getElementById('profileBio').value,
        sessionId: sessionId,
        internalData: 'sensitive_internal_information'
    };
    
    alert(`📤 Profile exported:\n\n${JSON.stringify(profileData, null, 2)}\n\n⚠️ Sensitive data exposed in export!`);
}

function changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
        // Weak password policy (Vuln #7)
        if (newPassword.length < 3) {
            alert('⚠️ Password too short but accepted anyway! (Weak password policy)');
        }
        
        // Store in plain text (Vuln #2)
        alert(`🔑 Password changed to: ${newPassword}\n⚠️ Password stored in plain text!`);
        console.log(`Password stored in plain text: ${newPassword}`);
    }
}

function viewLoginHistory() {
    // Expose sensitive information (Vuln #9 - No proper logging)
    const loginHistory = [
        '2024-01-15 10:30:22 - Login from 192.168.1.100 (Success)',
        '2024-01-15 09:15:11 - Login from 10.0.0.5 (Failed - wrong password)',
        '2024-01-14 16:45:33 - Login from 172.16.0.10 (Success)',
        '2024-01-14 14:20:15 - Admin access from 127.0.0.1 (Success)'
    ];
    
    alert(`📊 Login History:\n\n${loginHistory.join('\n')}\n\n⚠️ Detailed logs exposed to user!`);
}

// Simulate vulnerable session management (Vuln #7)
function generatePredictableSession() {
    // Predictable session ID generation
    const timestamp = Date.now();
    const predictableId = `SID${timestamp}ABC`;
    document.getElementById('sessionId').textContent = predictableId;
    sessionId = predictableId;
}

// Initialize vulnerable behaviors
document.addEventListener('DOMContentLoaded', function() {
    // Generate predictable session ID
    generatePredictableSession();
    
    // Simulate no CSRF protection (Vuln #8)
    console.log('Application loaded without CSRF protection');
    
    // Simulate verbose error reporting (Vuln #5)
    window.onerror = function(msg, url, line, col, error) {
        console.log(`Detailed error exposed: ${msg} at ${url}:${line}:${col}`);
        alert(`💥 Application Error (Exposed to user):\n${msg}\nFile: ${url}\nLine: ${line}\n\n⚠️ Detailed error information exposed!`);
        return false;
    };
    
    // Simulate outdated components (Vuln #6)
    console.log('Using jQuery 1.4.2 (vulnerable version)');
    console.log('Using Bootstrap 3.0.0 (outdated)');
    
    // No security headers (Vuln #5)
    console.log('Missing security headers: X-Frame-Options, CSP, HSTS');
    
    // Show initial section
    showSection('home');
});

// Additional vulnerable functions for demonstration

// Simulate weak cryptography (Vuln #2)
function weakEncrypt(data) {
    // ROT13 "encryption" - extremely weak
    return data.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

// Simulate insecure design (Vuln #4)
function processPayment(amount, cardNumber) {
    // No input validation, no encryption, logging sensitive data
    console.log(`Processing payment: $${amount} with card ${cardNumber}`);
    alert(`💳 Payment processed!\n⚠️ Card number logged in plain text!`);
}

// Simulate missing security monitoring (Vuln #9)
function logSecurityEvent(event) {
    // No actual logging implementation
    console.log(`Security event: ${event} - NOT LOGGED TO SECURITY SYSTEM`);
}

// Expose functions globally for testing
window.vulnApp = {
    weakEncrypt,
    processPayment,
    logSecurityEvent,
    users,
    currentUser,
    sessionId
};