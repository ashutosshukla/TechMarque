import requests
import json
import time

def check_server_health():
    """Check if the server is running and responsive"""
    try:
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Server is running and responsive")
            return True
        else:
            print(f"⚠️ Server responded with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Server health check failed: {e}")
        return False

def register_user():
    # API endpoint
    url = "http://localhost:5000/api/auth/register"
    
    # Headers
    headers = {
        "Content-Type": "application/json"
    }
    
    # Request data
    data = {
        "username": "admin",
        "email": "admin@techmarque.com",
        "password": "Admin@1234"
    }
    
    try:
        # Make the POST request
        response = requests.post(url, headers=headers, json=data)
        
        # Check if request was successful
        if response.status_code == 200 or response.status_code == 201:
            print("✅ User registered successfully!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Registration failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error: Make sure the server is running on localhost:5000")
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
    except json.JSONDecodeError:
        print("❌ Invalid JSON response from server")

if __name__ == "__main__":
    print("🔍 Checking server health...")
    if check_server_health():
        print("\n🚀 Attempting user registration...")
        register_user()
    else:
        print("\n❌ Server is not responding. Please check:")
        print("1. Is your Node.js server running? (node server.js)")
        print("2. Is MongoDB running?")
        print("3. Check MongoDB connection in your server logs")