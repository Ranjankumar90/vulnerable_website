# 🔓 VulnBlog - Deliberately Vulnerable Web Application

A deliberately vulnerable web application designed for educational purposes and security testing practice. This project demonstrates common web application vulnerabilities to help developers and security researchers understand how these vulnerabilities work and how to prevent them.

## ⚠️ **IMPORTANT WARNING**

**This application contains intentional security vulnerabilities for educational purposes only!**

- 🚫 **NEVER deploy this application in a production environment**
- 🚫 **NEVER use this on any public-facing server**
- 🚫 **NEVER use real credentials or sensitive data**
- ✅ **ONLY use in isolated, controlled environments for learning**

## 📋 Table of Contents

- [Features](#-features)
- [Vulnerabilities Demonstrated](#-vulnerabilities-demonstrated)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Testing Vulnerabilities](#-testing-vulnerabilities)
- [Security Best Practices](#-security-best-practices)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Features

- **Interactive Web Interface**: Modern, responsive design with multiple sections
- **Multiple Vulnerability Types**: Demonstrates 10 different OWASP Top 10 vulnerabilities
- **Educational Content**: Clear explanations of each vulnerability
- **Test Credentials**: Pre-configured test accounts for vulnerability testing
- **Real-time Feedback**: Immediate responses to demonstrate vulnerability exploitation

## 🚨 Vulnerabilities Demonstrated

This application intentionally contains the following vulnerabilities:

### 1. **Broken Access Control** (A01:2021)
- Direct object references without authorization
- Admin panel accessible without proper authentication
- IDOR (Insecure Direct Object Reference) vulnerabilities

### 2. **Cryptographic Failures** (A02:2021)
- Weak password hashing (plain text storage)
- Predictable session IDs
- No encryption for sensitive data

### 3. **Injection** (A03:2021)
- SQL injection vulnerabilities in login and search
- Cross-site scripting (XSS) in search results
- No input validation or sanitization

### 4. **Insecure Design** (A04:2021)
- Poor security architecture
- Missing security controls
- Flawed authentication mechanisms

### 5. **Security Misconfiguration** (A05:2021)
- Default credentials (admin/admin, guest/guest)
- Verbose error messages
- Debug mode enabled
- Outdated software versions

### 6. **Vulnerable Components** (A06:2021)
- Simulated outdated libraries
- Known vulnerable dependencies
- No dependency scanning

### 7. **Authentication Failures** (A07:2021)
- Weak session management
- No session timeout
- Predictable session IDs
- Poor password policies

### 8. **Data Integrity Failures** (A08:2021)
- No input validation
- File upload vulnerabilities
- No file type restrictions

### 9. **Logging Failures** (A09:2021)
- No security logging
- No audit trails
- Missing monitoring capabilities

### 10. **Server-Side Request Forgery** (A10:2021)
- SSRF vulnerabilities in file upload
- Ability to make internal requests
- No URL validation

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser
- Basic understanding of web security concepts

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vulnerable-website.git
   cd vulnerable-website/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 💻 Usage

### Getting Started

1. **Home Page**: Review the list of vulnerabilities present in the application
2. **Login Section**: Test authentication vulnerabilities with provided credentials
3. **Admin Panel**: Access admin functions without proper authorization
4. **Search**: Test XSS and SQL injection vulnerabilities
5. **File Upload**: Test file upload and SSRF vulnerabilities
6. **Profile**: Test IDOR vulnerabilities

### Test Credentials

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin` | Administrator |
| `guest` | `guest` | Guest User |

### SQL Injection Examples

```
Username: admin' OR '1'='1
Password: anything
```

### XSS Test Payloads

```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
```

## 🧪 Testing Vulnerabilities

### 1. SQL Injection Testing
- Use the login form with SQL injection payloads
- Try: `admin' OR '1'='1` as username
- Observe how the application responds

### 2. XSS Testing
- Use the search function with XSS payloads
- Try: `<script>alert('XSS')</script>`
- Check if the script executes

### 3. IDOR Testing
- In the profile section, change the User ID
- Try accessing other users' profiles
- Observe unauthorized access

### 4. File Upload Testing
- Try uploading different file types
- Test SSRF with internal URLs
- Observe lack of validation

## 🛡️ Security Best Practices

After testing vulnerabilities, learn how to prevent them:

### Prevention Techniques

1. **Input Validation**: Always validate and sanitize user input
2. **Parameterized Queries**: Use prepared statements for database queries
3. **Output Encoding**: Encode output to prevent XSS
4. **Access Control**: Implement proper authorization checks
5. **Session Management**: Use secure session handling
6. **File Upload Security**: Validate file types and scan for malware
7. **Error Handling**: Don't expose sensitive information in errors
8. **Regular Updates**: Keep dependencies and software updated
9. **Security Logging**: Implement comprehensive security logging
10. **Security Testing**: Regular penetration testing and code reviews

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Disclaimer

This application is created solely for educational purposes. The author is not responsible for any misuse of this application. Users are responsible for ensuring they use this application in a legal and ethical manner.

## 📞 Contact

**Created by: Ranjan Kumar**

- 📧 **Email**: ranjankrmth143@gmail.com
- 📱 **Mobile**: +91 9504076357
- 👨‍💻 **Role**: Cybersecurity Student & Ethical Hacker

---

**Remember**: This is a deliberately vulnerable application for learning purposes. Never use this in production or on any public-facing system!
