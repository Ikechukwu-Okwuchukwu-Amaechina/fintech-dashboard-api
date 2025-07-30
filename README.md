# Fintech Dashboard API

A simple Express.js and MongoDB API for a fintech dashboard.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with your MongoDB URI and desired port.
3. Start the server:
   ```sh
   node server.js
   ```

## Project Structure

- `controllers/` - Route controllers
- `middleware/` - Custom middleware
- `models/` - Mongoose models
- `routes/` - Express routes
- `app.js` - Express app setup
- `server.js` - App entry point



## How File Upload Works (For Beginners)

You can upload your profile picture or a video to this app! Here is how it works:

### How does it keep things safe?

- Only lets you upload pictures like `.jpg`, `.jpeg`, `.png`, or `.gif`. For videos, only `.mp4` and `.mov` are allowed.
- You can't upload weird files like `.exe`, `.js`, `.sh`, or anything that can run code. The server will say no!
- The biggest file you can upload is 20MB. If your file is bigger, it won't work.
- When you upload, the file gets a new name made from the current time and a random number. This stops files from having the same name.
- All the files you upload go into a folder called `uploads/`. This folder is not saved in git, so your files are private and won't go online by mistake.

### How to Upload a File (Step by Step)

#### With Postman (for testing)
1. Open Postman and make a new request.
2. Set it to `POST`.
3. To upload a picture, use this link: `/api/profile/upload-image`
   - Go to `Body` and pick `form-data`.
   - Add a key called `image` (set it to File) and pick your picture.
4. To upload a video, use `/api/profile/upload-video`
   - Go to `Body` and pick `form-data`.
   - Add a key called `video` (set it to File) and pick your video.
5. Click Send. If it works, you get a link to your file. If not, you get an error message.

#### With the Website (the easy way)
- Open `upload-profile.html` or `upload-video.html` in the `public/` folder with your browser.
- Pick your file and click upload.
- If your file is good, it uploads! If not, you get an error.

### Extra Info
- The `uploads/` folder is not saved in git, so your files are safe.
- The server always checks your file type and size before saving it.