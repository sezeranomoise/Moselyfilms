// GitHub Connector Configuration
// This allows authenticated access to GitHub API to avoid 403 errors

const GITHUB_CONFIG = {
  // GitHub API Settings
  API_BASE: "https://api.github.com",
  REPO_OWNER: "sezeranomoise",
  REPO_NAME: "Moselyfilms",
  
  // Authentication Type - Use Personal Access Token
  AUTH_TYPE: "token", // "token" or "oauth"
  
  // IMPORTANT: Store your token in GitHub Secrets, not here
  // For testing, you can use environment variables
  GET_TOKEN: () => {
    // In production, retrieve from secure storage
    return localStorage.getItem("github_token") || 
           sessionStorage.getItem("github_token") ||
           process.env.GITHUB_TOKEN;
  },

  // API Request Headers with proper CORS handling
  getHeaders: () => ({
    "Accept": "application/vnd.github.v3+json",
    "Authorization": `Bearer ${GITHUB_CONFIG.GET_TOKEN()}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  }),

  // CORS proxy for browser requests (if needed)
  CORS_PROXY: "https://cors-anywhere.herokuapp.com/",
  
  // Alternative: Use GitHub's built-in CORS support
  USE_GITHUB_CORS: true
};

// GitHub API Helper Functions
class GitHubConnector {
  constructor() {
    this.token = GITHUB_CONFIG.GET_TOKEN();
    this.baseURL = GITHUB_CONFIG.API_BASE;
  }

  // Fetch movies from GitHub repository
  async fetchMoviesFromRepo() {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/Movie.js`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: GITHUB_CONFIG.getHeaders()
      });

      if (response.status === 403) {
        throw new Error("403 Forbidden: Check your GitHub token permissions");
      }

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = atob(data.content); // Decode base64
      return content;
    } catch (error) {
      console.error("Failed to fetch movies from GitHub:", error);
      return null;
    }
  }

  // Get repository contents (videos, posters)
  async getRepositoryContents(path = "") {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${path}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: GITHUB_CONFIG.getHeaders()
      });

      if (response.status === 403) {
        throw new Error("403 Forbidden: Insufficient permissions");
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching repository contents:", error);
      return null;
    }
  }

  // Upload movie data to GitHub
  async uploadMovieData(fileName, content) {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${fileName}`;
      
      const response = await fetch(url, {
        method: "PUT",
        headers: GITHUB_CONFIG.getHeaders(),
        body: JSON.stringify({
          message: `Update ${fileName} via website`,
          content: btoa(content), // Encode to base64
          branch: "main"
        })
      });

      if (response.status === 403) {
        throw new Error("403 Forbidden: You don't have write permissions");
      }

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error uploading to GitHub:", error);
      return null;
    }
  }

  // Get file download URL (raw content)
  getFileDownloadUrl(filePath) {
    return `https://raw.githubusercontent.com/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/main/${filePath}`;
  }

  // Get repository info
  async getRepoInfo() {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: GITHUB_CONFIG.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch repo info: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching repo info:", error);
      return null;
    }
  }

  // Check token validity
  async validateToken() {
    try {
      const url = `${this.baseURL}/user`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: GITHUB_CONFIG.getHeaders()
      });

      return response.ok;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  }
}

// Initialize GitHub Connector
const githubConnector = new GitHubConnector();
