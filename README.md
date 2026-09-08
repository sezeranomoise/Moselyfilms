# 🎬 Moselyfilms - Movie Platform

Make my site be known and upload movies from current and past years with GitHub integration and ChatGPT support.

## 🔧 GitHub Connector Setup (Fix 403 Errors)

### What is a GitHub Connector?
A GitHub connector allows your website to authenticate with GitHub's API to:
- Access your movie database remotely
- Upload new movies without manually editing files
- Fetch posters and videos from GitHub
- Avoid 403 Forbidden errors

---

## 📋 Setup Instructions

### 1. **Create a Personal Access Token (PAT)**

1. Go to GitHub Settings → [Developer settings](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Moselyfilms-API`
4. Select these permissions:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read organization data)
   - ✅ `gist` (Create gists)

5. Click **"Generate token"** and **copy it immediately** (you won't see it again!)

### 2. **Add Token to Your Website**

#### Option A: Using Browser Storage (Development)
```javascript
// In your browser console or in Scripts.js:
localStorage.setItem("github_token", "ghp_YOUR_TOKEN_HERE");
```

#### Option B: Using Environment Variables (Production)
Create a `.env` file in your repository:
```
GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
VITE_GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
```

**⚠️ NEVER commit your token to GitHub! Always use `.env` file and add it to `.gitignore`**

### 3. **Test Your Connection**

Add this to your Index.html before closing `</body>`:
```html
<script src="github-config.js"></script>
<script>
  // Test GitHub connection
  githubConnector.validateToken().then(isValid => {
    if (isValid) {
      console.log("✅ GitHub connection successful!");
    } else {
      console.error("❌ Invalid token. Check your authentication.");
    }
  });
</script>
```

---

## 🚀 How to Use the Connector

### Load Movies from GitHub
```javascript
// In your Scripts.js or any script:
githubConnector.getRepositoryContents("Movie.js").then(data => {
  console.log("Movies loaded from GitHub:", data);
});
```

### Upload New Movie
```javascript
const newMovie = {
  title: "New Movie Title",
  year: 2026,
  genre: "Action",
  poster: "Poster/new-movie.jpg",
  video: "Video/new-movie.mp4"
};

githubConnector.uploadMovieData("Movie.js", JSON.stringify(newMovie));
```

### Get Raw Video/Poster URLs
```javascript
const posterUrl = githubConnector.getFileDownloadUrl("Poster/movie1.jpg");
const videoUrl = githubConnector.getFileDownloadUrl("Video/movie1.mp4");
```

---

## 🔐 Security Best Practices

✅ **DO:**
- Store tokens in environment variables
- Use token with minimal required permissions
- Regenerate tokens periodically
- Never commit tokens to GitHub

❌ **DON'T:**
- Hardcode tokens in JavaScript files
- Share your token with anyone
- Use old/unused tokens
- Give unnecessary permissions

---

## 📁 File Structure

```
sezeranomoise/Moselyfilms/
├── Index.html           # Main website
├── Movie.js             # Movie database
├── Scripts.js           # Display logic
├── github-config.js     # GitHub API connector
├── Poster/              # Movie posters folder
├── Video/               # Movie videos folder
├── .env                 # Environment variables (not committed)
├── .gitignore           # Ignore .env file
└── README.md            # This file
```

---

## 🛠️ Fixing 403 Forbidden Errors

| Error | Cause | Solution |
|-------|-------|----------|
| **403 Forbidden** | Invalid/expired token | Regenerate a new PAT |
| **403 Forbidden** | Missing permissions | Add `repo` scope to token |
| **404 Not Found** | Wrong file path | Check path in `github-config.js` |
| **CORS Error** | Browser blocked request | Use raw.githubusercontent.com URLs |

---

## 🤖 ChatGPT Integration (Coming Soon)

To add ChatGPT support for movie recommendations:
1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add to `.env`: `OPENAI_API_KEY=sk_YOUR_KEY`
3. Create `openai-config.js` with ChatGPT connector

---

## 📝 Example: Add a Movie Dynamically

```javascript
// In your website
const newMovie = `
{
  title: "The Matrix",
  year: 1999,
  genre: "Sci-Fi",
  poster: "Poster/matrix.jpg",
  video: "Video/matrix.mp4"
}
`;

githubConnector.uploadMovieData("Movie.js", newMovie);
```

---

## 🔗 Useful Links

- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [CORS Policy Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Environment Variables in JavaScript](https://www.freecodecamp.org/news/how-to-use-environment-variables-in-javascript/)

---

## ✨ Features

- 🎬 Browse movies from all years
- 🔍 Search by title, genre, or year
- 🖼️ Display movie posters
- ▶️ Play video links
- 🔐 Secure GitHub authentication
- 📱 Responsive design
- 🚀 Real-time updates from GitHub

---

## 📧 Support

If you encounter issues:
1. Check the browser console (F12 → Console)
2. Verify your GitHub token is valid
3. Ensure you have `repo` permissions
4. Check file paths in `github-config.js`

---

© 2026 Mosely Films. All rights reserved.
