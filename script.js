/**
 * THANIGAVEL D - CYBERSECURITY & CSE PORTFOLIO
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. --- THEME TOGGLE (DARK / LIGHT MODE) ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  // 2. --- TYPING ANIMATION IN HERO ---
  const typingText = document.getElementById('typingText');
  const roles = [
    'Cybersecurity Enthusiast',
    'Penetration Testing & Recon',
    'Vulnerability Assessment Student',
    'B.E. CSE (Cyber Security)',
    'OWASP & Network Defense'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1600; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 3. --- MOBILE DRAWER NAVIGATION ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 4. --- ACTIVE NAVBAR LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY > secTop && scrollY <= secTop + secHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 5. --- SKILLS CATEGORY FILTERING ---
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active state
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. --- COPY TO CLIPBOARD & TOAST SYSTEM ---
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied "${textToCopy}" to clipboard!`);
        
        // Visual button feedback
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-primary);"></i>';
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 1800);
      } catch (err) {
        // Fallback for clipboard
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });

  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-primary);"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // 7. --- MODALS (PROJECT DETAILS & RESUME) ---
  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalContent');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectTriggers = document.querySelectorAll('.project-modal-trigger');

  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const resumeOpenBtns = document.querySelectorAll('.resume-open-btn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  // Detailed project data
  const projectData = {
    'namma-heritage': {
      title: 'Namma Heritage – AI-Powered Cultural Heritage Platform',
      badge: 'Smart India Hackathon 2026',
      tagline: 'Preserving India’s cultural heritage through computer vision, voice AI, and crowdsourced digital archives.',
      details: `
        <div class="modal-project-body">
          <div class="modal-section">
            <h4><i class="fa-solid fa-circle-info"></i> Project Context</h4>
            <p>Developed for the prestigious <strong>Smart India Hackathon (SIH 2026)</strong>, Namma Heritage tackles the rapid loss of oral history, under-documented monuments, and language barriers that prevent people from understanding India's diverse traditions.</p>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-microchip"></i> Core Technological Innovations</h4>
            <ul class="modal-bullets">
              <li><strong>AI Image Landmark Recognition:</strong> Utilizes computer vision classifiers to detect historical structures, temple architectures, and cultural artifacts from camera captures.</li>
              <li><strong>Multilingual Speech & Audio Guides:</strong> Integrates Speech-to-Text and Text-to-Speech (TTS) models to deliver audio narrations in multiple regional languages for tourists and learners.</li>
              <li><strong>Location-Based Exploration:</strong> Uses geo-coordinates to surface nearby heritage landmarks, historical walking tours, and untold local folk stories.</li>
              <li><strong>Preservation Archive:</strong> A distributed digital catalog archiving oral narratives, cultural recipes, folk arts, and community contributions.</li>
            </ul>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-layer-group"></i> Architecture & Tech Stack</h4>
            <div class="tech-pills">
              <span>Python</span>
              <span>Computer Vision</span>
              <span>Speech-to-Text / TTS</span>
              <span>RESTful APIs</span>
              <span>Geo-Spatial Mapping</span>
              <span>Git & GitHub</span>
            </div>
          </div>
        </div>
      `
    },
    'network-recon': {
      title: 'Network Vulnerability Recon & Port Auditing',
      badge: 'Practical Lab Experience',
      tagline: 'Authorized network probing, service version detection, and vulnerability posture reporting.',
      details: `
        <div class="modal-project-body">
          <div class="modal-section">
            <h4><i class="fa-solid fa-circle-info"></i> Objective & Scope</h4>
            <p>Simulated host discovery and port enumeration workflows in isolated laboratory networks to discover unhardened services and misconfigurations.</p>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-terminal"></i> Methodology & Tools</h4>
            <ul class="modal-bullets">
              <li>Executed TCP Connect, SYN Stealth, and UDP scans using <strong>Nmap</strong>.</li>
              <li>Identified service banners, software daemon versions, and common default credentials.</li>
              <li>Analyzed live network traffic flows with <strong>Wireshark</strong> to observe handshake anomalies.</li>
              <li>Compiled formal vulnerability and exposure audit reports detailing recommendations for firewall rule hardening.</li>
            </ul>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-shield-halved"></i> Key Takeaway</h4>
            <p>Demonstrates deep familiarity with Layer 3 / Layer 4 networking protocols, port security, and automated scanning hygiene.</p>
          </div>
        </div>
      `
    },
    'web-sec': {
      title: 'Web Application Vulnerability Assessment Lab',
      badge: 'Offensive Security Testing',
      tagline: 'Deep dive into OWASP Top 10 vulnerabilities, HTTP parameter tampering, and injection payloads.',
      details: `
        <div class="modal-project-body">
          <div class="modal-section">
            <h4><i class="fa-solid fa-circle-info"></i> Practical Lab Framework</h4>
            <p>Hands-on vulnerability testing conducted on deliberately vulnerable targets like <strong>OWASP Juice Shop</strong> and simulated practice labs.</p>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-bug"></i> Tested Vulnerabilities</h4>
            <ul class="modal-bullets">
              <li><strong>Burp Suite Proxy:</strong> Intercepted client requests, modified headers, cookie tokens, and URL parameters on the fly.</li>
              <li><strong>SQL Injection (SQLi):</strong> Discovered authentication bypass vectors and data extraction loopholes caused by unparameterized queries.</li>
              <li><strong>Cross-Site Scripting (XSS):</strong> Verified stored and reflected script execution through unescaped user input forms.</li>
              <li><strong>Broken Access Control:</strong> Tested horizontal and vertical privilege escalation vectors.</li>
            </ul>
          </div>

          <div class="modal-section">
            <h4><i class="fa-solid fa-code-compare"></i> Remediation Knowledge</h4>
            <p>Understands the defensive counterparts: prepared statements, input validation, context-aware output encoding, and secure cookie headers.</p>
          </div>
        </div>
      `
    }
  };

  // Open Project Modal
  projectTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectData[projectKey];

      if (data && projectModalContent) {
        projectModalContent.innerHTML = `
          <div class="modal-header">
            <span class="category-pill">${data.badge}</span>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-tagline">${data.tagline}</p>
          </div>
          ${data.details}
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Project Modal
  if (projectModalClose) {
    projectModalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Open Resume Modal
  resumeOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Resume Modal
  if (resumeModalClose) {
    resumeModalClose.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modals on clicking overlay background
  [projectModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Print Resume action
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 8. --- INTERACTIVE CYBER TERMINAL CLI ---
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const terminalChips = document.querySelectorAll('.t-chip');
  const quickTerminalBtn = document.getElementById('quickTerminalBtn');

  // Command history
  let cmdHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: `
Available commands:
  <span class="cmd-highlight">whoami</span>       - Display profile overview and summary
  <span class="cmd-highlight">skills</span>       - List technical skill arsenal
  <span class="cmd-highlight">projects</span>     - List key projects (SIH 2026, Labs)
  <span class="cmd-highlight">experience</span>   - View practical experience & club details
  <span class="cmd-highlight">education</span>    - View degree, CGPA, and schooling
  <span class="cmd-highlight">certs</span>        - List verified certifications & workshops
  <span class="cmd-highlight">contact</span>      - Output email, phone number & profiles
  <span class="cmd-highlight">nmap</span>         - Run a simulated port scan
  <span class="cmd-highlight">date</span>         - Display current system timestamp
  <span class="cmd-highlight">clear</span>        - Clear terminal screen
    `,
    whoami: `
<strong>THANIGAVEL D</strong>
Role: Motivated 3rd-Year Computer Science Engineering Student
Specialization: Cyber Security (B.E)
Status: Seeking Cybersecurity Internship
Focus: Ethical Hacking, Vulnerability Assessment, Network Scanning & AppSec.
    `,
    skills: `
<strong>TECHNICAL SKILLS:</strong>
  • <strong>Operating Systems:</strong> Kali Linux, Linux (Debian), Windows
  • <strong>Networking:</strong> TCP/IP, DNS, HTTP/HTTPS, OSI Model, Common Ports
  • <strong>Security Tools:</strong> Nmap, Burp Suite, Wireshark
  • <strong>Programming:</strong> Java, Python, C
  • <strong>Cybersecurity:</strong> OWASP Top 10, Vulnerability Assessment, SQLi, XSS
  • <strong>Dev Tools:</strong> Git, GitHub, VirtualBox, VS Code
    `,
    projects: `
<strong>PROJECT HIGHLIGHTS:</strong>
  [1] <strong>Namma Heritage</strong> (Smart India Hackathon 2026)
      - AI-powered Indian Cultural Heritage Platform.
      - Image recognition, speech-to-text, TTS, location-based stories.
  [2] <strong>Network Scanning & Port Enumeration Lab</strong>
      - Nmap host discovery, service version probing, security documentation.
  [3] <strong>Web Application Security Testing</strong>
      - Burp Suite HTTP analysis, OWASP Juice Shop vulnerability exploitation.
    `,
    experience: `
<strong>PRACTICAL EXPERIENCE:</strong>
  • <strong>Red Hawks Cyber Club (Tech Team):</strong>
    Contributed to cybersecurity workshops, technical sessions, and development activities.
  • <strong>Network Scanning & Enumeration:</strong>
    Practiced Nmap in authorized labs; identified open ports, daemon versions, and documented findings.
  • <strong>Web Application Security Testing:</strong>
    Analyzed HTTP requests/responses using Burp Suite; studied OWASP Top 10 flaws in practice labs.
    `,
    education: `
<strong>EDUCATION:</strong>
  • <strong>Prince Dr. K. Vasudevan College of Engineering and Technology</strong> (2024 - 2028)
    Degree: B.E Computer Science Engineering (Cyber Security)
    CGPA: <strong>7.8 / 10</strong> | 3rd Year
  • <strong>CHSS Maduvinkarai Higher Secondary School</strong> (2022 - 2024)
    Stream: SSLC & HSC - Computer Science
    `,
    certs: `
<strong>CERTIFICATIONS & WORKSHOPS:</strong>
  • <strong>Cisco:</strong> Cyber Security Basic
  • <strong>OWASP:</strong> Juice Shop Workshop (Oct 2026)
  • <strong>TG Cyber Labs:</strong> Mastering the Art of Ethical Hacking (Sep 2026)
    Instructed by Mr. Sriram (Founder - TG Cyber Labs)
    `,
    contact: `
<strong>CONTACT DETAILS:</strong>
  • Phone:    <a href="tel:+917395949874" style="color:#38bdf8;">+91-7395949874</a>
  • Email:    <a href="mailto:thanigaveldasa29@gmail.com" style="color:#38bdf8;">thanigaveldasa29@gmail.com</a>
  • LinkedIn: <a href="https://linkedin.com" target="_blank" style="color:#38bdf8;">linkedin.com</a>
  • GitHub:   <a href="https://github.com/thanigaveldasa29-byte" target="_blank" style="color:#38bdf8;">github.com/thanigaveldasa29-byte</a>
    `,
    nmap: `
Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}
Initiating SYN Stealth Scan on target-lab.local (192.168.1.105)...
Discovered open port 22/tcp (SSH - OpenSSH 8.9p1)
Discovered open port 80/tcp (HTTP - Apache httpd 2.4.52)
Discovered open port 443/tcp (HTTPS - SSL/TLS)
Discovered open port 3306/tcp (MySQL 8.0)
Nmap scan report completed: 4 open ports scanned in 0.82 seconds.
Status: Host is UP. Ready for vulnerability analysis!
    `,
    sudo: `
Permission denied: guest is not in the sudoers file. This incident will be reported to Thanigavel.
    `,
    date: `
Current system time: ${new Date().toString()}
    `
  };

  function executeCommand(inputVal) {
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    // Save to history
    cmdHistory.push(trimmed);
    historyIndex = cmdHistory.length;

    // Create entry element
    const entry = document.createElement('div');
    entry.className = 'terminal-line-entry';

    if (trimmed === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    let outputHtml = '';
    if (terminalCommands[trimmed]) {
      outputHtml = terminalCommands[trimmed];
    } else {
      outputHtml = `<span style="color:#f87171;">Command not found: '${trimmed}'. Type <span class="cmd-highlight">'help'</span> for a list of available commands.</span>`;
    }

    entry.innerHTML = `
      <div class="terminal-cmd-user"><span style="color:#64748b;">guest@thanigavel:~$</span> ${inputVal}</div>
      <div class="terminal-cmd-output">${outputHtml}</div>
    `;

    terminalOutput.appendChild(entry);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        executeCommand(val);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // Quick Command Chips
  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (terminalInput) terminalInput.value = cmd;
        executeCommand(cmd);
        if (terminalInput) terminalInput.value = '';
      }
    });
  });

  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = `
        <div class="t-line welcome-msg">
          Terminal screen cleared. Type <span class="cmd-highlight">'help'</span> to see commands.
        </div>
      `;
    });
  }

  if (quickTerminalBtn) {
    quickTerminalBtn.addEventListener('click', () => {
      const termSec = document.getElementById('terminal-section');
      if (termSec) {
        termSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (terminalInput) terminalInput.focus();
        }, 500);
      }
    });
  }

  // 9. --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value.trim();
      const senderEmail = document.getElementById('senderEmail').value.trim();
      const msgSubject = document.getElementById('msgSubject').value.trim();
      const msgContent = document.getElementById('msgContent').value.trim();

      if (!senderName || !senderEmail || !msgSubject || !msgContent) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please complete all required fields.';
        return;
      }

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        Thank you, ${senderName}! Preparing your message. Opening your email client to dispatch to thanigaveldasa29@gmail.com...
      `;

      showToast('Opening default email client to send message...');

      // Trigger mailto with formatted subject and body
      const mailtoUrl = `mailto:thanigaveldasa29@gmail.com?subject=${encodeURIComponent(msgSubject)}&body=${encodeURIComponent(
        `Hi Thanigavel,\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${msgContent}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 900);

      contactForm.reset();
    });
  }

  // 10. --- BACK TO TOP BUTTON ---
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Update dynamic year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
