export const services = [
    // Development Services
    {
        id: 1,
        slug: "custom-software-development",
        category: "development",
        icon: "Code",
        title: "Custom Software Development",
        shortDescription: "Tailored solutions built with cutting-edge technologies to meet your unique business requirements.",
        features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"],
        detailedDescription: "Our custom software development services provide end-to-end solutions tailored to your specific business needs. We leverage the latest technologies and best practices to build robust, scalable, and maintainable applications that drive your business forward.",
        technologies: ["React", "Node.js", "Python", "Java", "C#", ".NET", "MongoDB", "PostgreSQL"],
        pricing: "Starting from $4,000",
        timeline: "4-12 weeks",
        benefits: [
            "Fully customized to your business needs",
            "Scalable architecture for future growth",
            "Modern tech stack and best practices",
            "Ongoing support and maintenance",
            "Integration with existing systems"
        ],
        process: [
            "Requirements Analysis & Planning",
            "UI/UX Design & Prototyping",
            "Development & Testing",
            "Deployment & Launch",
            "Support & Maintenance"
        ],
        caseStudies: [
            {
                title: "E-commerce Platform",
                description: "Built a custom e-commerce solution that increased sales by 150%"
            },
            {
                title: "Inventory Management",
                description: "Developed an inventory system that reduced operational costs by 30%"
            }
        ]
    },
    {
        id: 2,
        slug: "web-development",
        category: "development",
        icon: "Globe",
        title: "Web Development",
        shortDescription: "Modern, responsive websites and web applications that deliver exceptional user experiences.",
        features: ["Responsive Design", "Single Page Applications", "E-commerce", "CMS Integration"],
        detailedDescription: "We create high-performance websites and web applications using modern frameworks and technologies. Our solutions are optimized for speed, security, and scalability.",
        technologies: ["React", "Next.js", "Vue.js", "Angular", "Laravel", "Django"],
        pricing: "Starting from $3,000",
        timeline: "3-8 weeks",
        benefits: [
            "Mobile-first responsive design",
            "SEO optimized",
            "Fast loading times",
            "Secure and scalable",
            "Ongoing maintenance"
        ]
    },

    // Cloud Services
    {
        id: 3,
        slug: "cloud-migration",
        category: "cloud",
        icon: "Cloud",
        title: "Cloud Migration",
        shortDescription: "Seamless transition to cloud infrastructure with minimal downtime and maximum efficiency.",
        features: ["AWS Migration", "Azure Migration", "Hybrid Cloud", "Cost Optimization"],
        detailedDescription: "We help organizations migrate their infrastructure and applications to the cloud with minimal disruption. Our migration strategy ensures security, performance, and cost-efficiency.",
        technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes"],
        pricing: "Starting from $7,000",
        timeline: "4-10 weeks",
        benefits: [
            "Reduced infrastructure costs",
            "Improved scalability",
            "Enhanced security",
            "24/7 monitoring",
            "Disaster recovery"
        ]
    },
    {
        id: 4,
        slug: "devops",
        category: "cloud",
        icon: "Settings",
        title: "DevOps Services",
        shortDescription: "Implement DevOps practices to accelerate delivery and improve software quality.",
        features: ["CI/CD Pipelines", "Infrastructure as Code", "Monitoring", "Automation"],
        detailedDescription: "Our DevOps services help you implement continuous integration, continuous delivery, and infrastructure automation to streamline your development process.",
        technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Ansible"],
        pricing: "Starting from $4,500",
        timeline: "3-6 weeks",
        benefits: [
            "Faster time to market",
            "Higher quality software",
            "Reduced manual errors",
            "Better collaboration",
            "Cost efficiency"
        ]
    },

    // Security Services
    {
        id: 5,
        slug: "security-audits",
        category: "security",
        icon: "Shield",
        title: "Security Audits",
        shortDescription: "Comprehensive security assessments to identify vulnerabilities and risks.",
        features: ["Vulnerability Scanning", "Risk Assessment", "Compliance Check", "Remediation Plan"],
        detailedDescription: "Our security audits provide a thorough examination of your systems to identify vulnerabilities, assess risks, and recommend remediation strategies.",
        technologies: ["Nessus", "Burp Suite", "OWASP ZAP", "Metasploit"],
        pricing: "Starting from $2,500",
        timeline: "2-4 weeks",
        benefits: [
            "Identify security gaps",
            "Meet compliance requirements",
            "Protect sensitive data",
            "Prevent breaches",
            "Peace of mind"
        ]
    },
    {
        id: 6,
        slug: "penetration-testing",
        category: "security",
        icon: "Lock",
        title: "Penetration Testing",
        shortDescription: "Simulated cyber attacks to evaluate your system's security.",
        features: ["Network Testing", "Web App Testing", "Social Engineering", "Reporting"],
        detailedDescription: "Our ethical hackers simulate real-world attacks to identify exploitable vulnerabilities in your systems before malicious actors can find them.",
        technologies: ["Kali Linux", "Metasploit", "Nmap", "Wireshark"],
        pricing: "Starting from $3,500",
        timeline: "3-5 weeks",
        benefits: [
            "Proactive security",
            "Real-world testing",
            "Detailed reports",
            "Remediation guidance",
            "Compliance support"
        ]
    },

    // Additional Services
    {
        id: 7,
        slug: "ai-ml-solutions",
        category: "innovation",
        icon: "Cpu",
        title: "AI/ML Solutions",
        shortDescription: "Leverage artificial intelligence and machine learning to gain competitive advantage.",
        features: ["Predictive Analytics", "Computer Vision", "NLP", "Recommendation Systems"],
        detailedDescription: "We develop custom AI and machine learning solutions that help businesses automate processes, gain insights from data, and improve decision making.",
        technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLTK"],
        pricing: "Starting from $10,000",
        timeline: "6-16 weeks",
        benefits: [
            "Data-driven decisions",
            "Process automation",
            "Competitive advantage",
            "Improved efficiency",
            "Future-proof solutions"
        ]
    },
    {
        id: 8,
        slug: "blockchain-development",
        category: "innovation",
        icon: "Link",
        title: "Blockchain Development",
        shortDescription: "Secure, decentralized solutions for various business applications.",
        features: ["Smart Contracts", "DApps", "NFTs", "Tokenization"],
        detailedDescription: "We build blockchain-based solutions that provide transparency, security, and decentralization for various business applications.",
        technologies: ["Ethereum", "Solidity", "Hyperledger", "Web3.js"],
        pricing: "Starting from $8,000",
        timeline: "8-20 weeks",
        benefits: [
            "Enhanced security",
            "Transparent transactions",
            "Reduced costs",
            "New business models",
            "Future-ready"
        ]
    }
];

export const serviceCategories = [
    {
        slug: "development",
        name: "Development",
        description: "Custom software solutions tailored to your business needs"
    },
    {
        slug: "cloud",
        name: "Cloud",
        description: "Scalable cloud infrastructure and services"
    },
    {
        slug: "security",
        name: "Security",
        description: "Comprehensive cybersecurity solutions"
    },
    {
        slug: "innovation",
        name: "Innovation",
        description: "Cutting-edge technology solutions"
    }
];