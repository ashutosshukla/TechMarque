import requests
import json
import time

class TechMarqueBlogSetup:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.token = None
        self.headers = {"Content-Type": "application/json"}
    
    def login(self, email="admin@techmarque.com", password="Admin@1234"):
        """Login to get authentication token"""
        try:
            response = requests.post(
                f"{self.base_url}/api/auth/login",
                headers=self.headers,
                json={"email": email, "password": password}
            )
            
            if response.status_code == 200:
                data = response.json()
                self.token = data["token"]
                self.headers["Authorization"] = f"Bearer {self.token}"
                print(f"✅ Logged in successfully as {data['user']['username']}")
                return True
            else:
                print(f"❌ Login failed: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Login request failed: {e}")
            return False
    
    def create_categories(self):
        """Create 4 demo categories"""
        categories = [
            {
                "name": "Technology",
                "description": "Latest technology trends, gadgets, and innovations",
                "color": "#3B82F6"
            },
            {
                "name": "Web Development",
                "description": "Frontend, backend, and full-stack development tutorials",
                "color": "#10B981"
            },
            {
                "name": "AI & Machine Learning",
                "description": "Artificial intelligence, ML algorithms, and data science",
                "color": "#8B5CF6"
            },
            {
                "name": "Digital Marketing",
                "description": "SEO, social media marketing, and online business strategies",
                "color": "#F59E0B"
            }
        ]
        
        created_categories = []
        
        for category in categories:
            try:
                response = requests.post(
                    f"{self.base_url}/api/admin/categories",
                    headers=self.headers,
                    json=category
                )
                
                if response.status_code == 201:
                    created_cat = response.json()
                    created_categories.append(created_cat)
                    print(f"✅ Created category: {category['name']}")
                else:
                    print(f"⚠️ Category '{category['name']}' creation failed: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                print(f"❌ Failed to create category '{category['name']}': {e}")
        
        return created_categories
    
    def create_demo_blog(self):
        """Create a comprehensive demo blog post"""
        blog_data = {
            "title": "Getting Started with Modern Web Development: A Complete Guide",
            "excerpt": "Discover the essential tools, frameworks, and best practices for modern web development. This comprehensive guide covers everything from frontend technologies to backend architecture.",
            "content": """
# Getting Started with Modern Web Development: A Complete Guide

Welcome to the exciting world of modern web development! Whether you're a complete beginner or looking to update your skills, this guide will walk you through the essential concepts and tools you need to know.

## What is Modern Web Development?

Modern web development has evolved significantly over the past decade. Today's web applications are more interactive, responsive, and feature-rich than ever before. The landscape includes:

- **Frontend Development**: Creating user interfaces with HTML, CSS, and JavaScript
- **Backend Development**: Server-side logic, databases, and APIs
- **Full-Stack Development**: Combining both frontend and backend skills
- **DevOps**: Deployment, monitoring, and maintenance of web applications

## Essential Frontend Technologies

### 1. HTML5
HTML5 provides the structure for web pages with semantic elements that improve accessibility and SEO. Key features include:
- Semantic elements like `<header>`, `<nav>`, `<article>`
- Multimedia support with `<video>` and `<audio>`
- Form enhancements and validation
- Local storage capabilities

### 2. CSS3 and Modern Styling
CSS3 brings powerful styling capabilities:
- Flexbox and Grid for responsive layouts
- Animations and transitions
- Custom properties (CSS variables)
- Media queries for responsive design

### 3. JavaScript ES6+
Modern JavaScript features that every developer should know:
- Arrow functions and template literals
- Destructuring and spread operators
- Promises and async/await
- Modules and classes

## Popular Frontend Frameworks

### React
React has become the most popular frontend library due to its:
- Component-based architecture
- Virtual DOM for performance
- Large ecosystem and community
- Excellent developer tools

### Vue.js
Vue.js offers:
- Gentle learning curve
- Excellent documentation
- Progressive framework approach
- Great performance out of the box

### Angular
Angular provides:
- Full-featured framework
- TypeScript by default
- Powerful CLI tools
- Enterprise-ready features

## Backend Technologies

### Node.js
Node.js allows JavaScript on the server with benefits like:
- Single language for full-stack development
- Large package ecosystem (npm)
- Excellent performance for I/O operations
- Great for real-time applications

### Python (Django/Flask)
Python backend frameworks offer:
- Clean, readable syntax
- Rapid development capabilities
- Strong community and libraries
- Excellent for data-driven applications

### Database Technologies
Choose the right database for your needs:
- **SQL Databases**: PostgreSQL, MySQL for structured data
- **NoSQL Databases**: MongoDB, Redis for flexible schemas
- **Cloud Databases**: Firebase, AWS DynamoDB for scalability

## Development Tools and Workflow

### Version Control
Git is essential for:
- Tracking code changes
- Collaboration with team members
- Branching and merging strategies
- Integration with platforms like GitHub

### Package Managers
- **npm/yarn**: For JavaScript packages
- **pip**: For Python packages
- **composer**: For PHP packages

### Build Tools
Modern development relies on build tools:
- **Webpack**: Module bundling and optimization
- **Vite**: Fast build tool and dev server
- **Parcel**: Zero-configuration build tool

## Best Practices for Modern Development

### 1. Responsive Design
Ensure your applications work on all devices:
- Mobile-first approach
- Flexible grid systems
- Optimized images and media
- Touch-friendly interfaces

### 2. Performance Optimization
- Code splitting and lazy loading
- Image optimization
- Minification and compression
- CDN usage for static assets

### 3. Security
- Input validation and sanitization
- HTTPS everywhere
- Secure authentication and authorization
- Regular security updates

### 4. Testing
Implement comprehensive testing:
- Unit tests for individual components
- Integration tests for workflows
- End-to-end tests for user journeys
- Automated testing in CI/CD pipelines

## Getting Started: Your First Project

Here's a simple roadmap to begin your web development journey:

1. **Learn the Basics**: Start with HTML, CSS, and JavaScript
2. **Build Simple Projects**: Create a portfolio website or landing page
3. **Choose a Framework**: Pick React, Vue, or Angular based on your goals
4. **Learn Backend Basics**: Start with Node.js or Python
5. **Build Full-Stack Projects**: Create applications with databases
6. **Deploy Your Projects**: Use platforms like Netlify, Vercel, or Heroku
7. **Continue Learning**: Stay updated with new technologies and best practices

## Conclusion

Modern web development is an exciting field with endless opportunities for creativity and innovation. The key to success is continuous learning and practice. Start with the fundamentals, build projects regularly, and don't be afraid to experiment with new technologies.

Remember, every expert was once a beginner. Focus on building solid foundations, and gradually expand your skills as you grow more comfortable with the core concepts.

Happy coding! 🚀

---

*Want to learn more about web development? Check out our other articles on specific technologies and advanced topics.*
            """,
            "category": "Web Development",
            "tags": "web development, HTML, CSS, JavaScript, React, Node.js, tutorial, beginner",
            "status": "published",
            "metaTitle": "Modern Web Development Guide 2024 - Complete Tutorial for Beginners",
            "metaDescription": "Learn modern web development with our comprehensive guide. Covers HTML5, CSS3, JavaScript, React, Node.js, and best practices for building web applications.",
            "keywords": "web development, HTML5, CSS3, JavaScript, React, Node.js, frontend, backend, tutorial"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/admin/blogs",
                headers=self.headers,
                json=blog_data
            )
            
            if response.status_code == 201:
                blog = response.json()
                print(f"✅ Created demo blog: '{blog['title']}'")
                print(f"📝 Blog slug: {blog['slug']}")
                print(f"📊 Status: {blog['status']}")
                return blog
            else:
                print(f"❌ Blog creation failed: {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to create demo blog: {e}")
            return None
    
    def get_categories(self):
        """Fetch all categories to verify creation"""
        try:
            response = requests.get(f"{self.base_url}/api/categories")
            if response.status_code == 200:
                categories = response.json()
                print(f"\n📁 Available Categories ({len(categories)}):")
                for cat in categories:
                    print(f"  - {cat['name']} (slug: {cat['slug']})")
                return categories
            else:
                print(f"❌ Failed to fetch categories: {response.text}")
                return []
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to fetch categories: {e}")
            return []
    
    def get_blogs(self):
        """Fetch all blogs to verify creation"""
        try:
            response = requests.get(f"{self.base_url}/api/blogs")
            if response.status_code == 200:
                data = response.json()
                blogs = data.get('blogs', [])
                print(f"\n📚 Available Blogs ({len(blogs)}):")
                for blog in blogs:
                    print(f"  - {blog['title']} (category: {blog['category']})")
                return blogs
            else:
                print(f"❌ Failed to fetch blogs: {response.text}")
                return []
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to fetch blogs: {e}")
            return []
    
    def setup_demo_content(self):
        """Main method to set up all demo content"""
        print("🚀 Starting TechMarque Blog Demo Setup...")
        print("=" * 50)
        
        # Step 1: Login
        print("\n1️⃣ Logging in...")
        if not self.login():
            print("❌ Setup failed: Could not log in")
            return False
        
        # Step 2: Create categories
        print("\n2️⃣ Creating categories...")
        categories = self.create_categories()
        
        # Step 3: Create demo blog
        print("\n3️⃣ Creating demo blog...")
        blog = self.create_demo_blog()
        
        # Step 4: Verify content
        print("\n4️⃣ Verifying created content...")
        self.get_categories()
        self.get_blogs()
        
        print("\n" + "=" * 50)
        if categories and blog:
            print("✅ Demo setup completed successfully!")
            print(f"🌐 Access your blog at: http://localhost:3000")
            print(f"⚙️ Admin panel: http://localhost:3000/admin")
        else:
            print("⚠️ Demo setup completed with some issues")
        
        return True

def main():
    # Initialize the setup class
    setup = TechMarqueBlogSetup()
    
    # Run the complete setup
    setup.setup_demo_content()

if __name__ == "__main__":
    main()
    