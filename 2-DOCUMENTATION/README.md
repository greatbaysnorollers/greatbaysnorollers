# Great Bay Sno-Rollers Website

Welcome! This is a simple, beautiful website for your snowmobile club. No coding experience needed to update it!

## 📁 Folder Structure

The website is organized into the following folders:

- **0-ARCHIVE/** - Previous versions of the website (dated backups)
- **1-REFERENCE/** - Original files and reference materials
- **2-DOCUMENTATION/** - This README and other documentation files
- **3-MEDIA/** - All photos and media files
  - **1-Photos/** - Snowmobile photos, logos, and headshots
- **index.html** - Main homepage with trail updates and club info
- **gallery.html** - Photo gallery page
- **weather-trails.html** - Weather widgets and trail maps
- **events.html** - Google Calendar integration for club events
- **landing.html** - Quick links page (perfect for QR codes)

## 🎯 Quick Start: Updating Content

### How to Add Trail Condition Updates

1. Open `index.html` in any text editor (Notepad, TextEdit, VS Code, etc.)
2. Find the section marked `<!-- Trail condition updates with status badges -->`
3. Add new updates at the **TOP** of this section (most recent first)

**Example Trail Update Card:**
```html
<div class="update-card status-open">
    <div class="update-header">
        <h3 class="update-title">Main Trails Open - March 15, 2025</h3>
        <span class="status-badge open">Open</span>
    </div>
    <p class="update-date">📅 March 15, 2025</p>
    <div class="update-content">
        <p>Groomed all main trails this morning. Conditions are excellent with 6 inches of fresh powder. Enjoy!</p>
    </div>
</div>
```

### How to Add Club Updates (Meetings, Events, Announcements)

1. Open `index.html`
2. Find the section marked `<!-- Club updates without status badges -->`
3. Add new updates at the **TOP** (most recent first)

**Example Club Update Card:**
```html
<div class="update-card" style="background: white; border-left: 5px solid var(--logo-gradient-start);">
    <div class="update-header">
        <h3 class="update-title">January Meeting - January 10th</h3>
    </div>
    <p class="update-date">📅 January 5, 2025</p>
    <div class="update-content">
        <p><strong>Monthly Meeting Announcement</strong></p>
        <p style="margin-top: 10px;">Join us for our January meeting!</p>

        <p style="margin-top: 15px;"><strong>Meeting Details:</strong></p>
        <ul style="padding-left: 25px; line-height: 1.8;">
            <li><strong>Date:</strong> Wednesday, January 10th</li>
            <li><strong>Time:</strong> 6:30 PM</li>
            <li><strong>Location:</strong> 31 Tuckers Way, Newmarket, NH 03857</li>
        </ul>
    </div>
</div>
```

### How to Add Photos to Updates

Photos are stored in `3-MEDIA/1-Photos/`. To add photos to an update:

```html
<div class="update-content">
    <p>Your text here...</p>
    <div class="update-images">
        <img src="3-MEDIA/1-Photos/your-photo-name.jpg" alt="Description" onclick="window.open(this.src, '_blank')">
        <img src="3-MEDIA/1-Photos/another-photo.jpg" alt="Description" onclick="window.open(this.src, '_blank')">
    </div>
</div>
```

### Status Badge Types (Trail Updates Only):
- **Open trails**: `status-open` and `badge open`
- **Closed trails**: `status-closed` and `badge closed`
- **Caution/Warning**: `status-caution` and `badge caution`

**Note:** Club updates (meetings, announcements) should NOT have status badges.

## 📸 Adding New Photos

1. Save your photos to `3-MEDIA/1-Photos/`
2. Reference them in HTML using: `3-MEDIA/1-Photos/filename.jpg`
3. For gallery photos, add to `gallery.html`:

```html
<div class="gallery-item" data-src="3-MEDIA/1-Photos/your-photo.jpg">
    <img src="3-MEDIA/1-Photos/your-photo.jpg" alt="Description">
    <div class="gallery-item-overlay">
        <p>Click to view full size</p>
    </div>
</div>
```

## 🌐 Hosting Your Website (Easiest Options)

### Option 1: Netlify (RECOMMENDED - Free & Easy)
**Best for: No experience needed, automatic updates**

1. Go to [Netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop your entire website folder into Netlify
3. Get a free URL like `greatbaysnorollers.netlify.app`
4. Can upgrade to custom domain later (`greatbaysnorollers.com`)

**To Update:** Just drag the updated files again, or connect to GitHub

### Option 2: GitHub Pages (Free, Good for Learning)
**Best for: Want to learn basics, free hosting forever**

1. Create account at [GitHub.com](https://github.com)
2. Create a new repository called `sno-rollers-website`
3. Upload all files maintaining folder structure
4. Go to Settings → Pages → Enable GitHub Pages
5. Your site will be at `yourusername.github.io/sno-rollers-website`

**To Update:** Upload new files or use GitHub Desktop app

### Option 3: Cloudflare Pages (Free, Fast)
**Best for: Want speed and free custom domain**

1. Sign up at [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub repo or upload files
3. Free hosting + free SSL certificate
4. Very fast global delivery

## 🎨 Customizing Your Site

### Change Contact Information

**In landing.html:**
Find the contact section and update:
```html
<div class="contact-item">
    <span class="contact-label">Email:</span>
    <span class="contact-value">
        <a href="mailto:greatbaysnorollers@gmail.com">greatbaysnorollers@gmail.com</a>
    </span>
</div>
```

### Update Google Calendar

**In events.html:**
Replace the calendar embed URL with your club's Google Calendar:
```html
<iframe src="https://calendar.google.com/calendar/embed?src=greatbaysnorollers%40gmail.com&ctz=America%2FNew_York"
```

### Change Colors

At the top of each HTML file, find the `:root` section:
```css
:root {
    --ice-blue: #D4E7F5;
    --deep-blue: #1A3A52;
    --accent-orange: #FF4500;
    --logo-gradient-start: #FF4500;
    --logo-gradient-mid: #FF6B35;
    --logo-gradient-end: #FFA726;
}
```

## 📱 QR Code for Landing Page

Once hosted, create a QR code for your landing page:
1. Use a free QR code generator (qr-code-generator.com)
2. Enter your landing page URL
3. Download and print for trail signs, flyers, etc.

## 🔄 Should You Use Git?

**YES, if:**
- Multiple people will update the website
- You want version history (undo changes)
- You want automatic backups
- Using GitHub Pages or similar hosting

**NO (for now), if:**
- Only one person updates it
- You're comfortable with manual backups
- You prefer simple file editing

### If You Want to Use Git (Later):

1. Install [GitHub Desktop](https://desktop.github.com) (easiest)
2. Create a repository from your website folder
3. "Commit" changes when you update files
4. "Push" to sync online

## 📝 Key Website Features

### Main Homepage (index.html)
- **Join the Club** section with membership benefits
- **Trail Conditions** with status badges (Open/Closed/Caution)
- **Club Updates** for meetings and announcements
- **Grooming & Trail Work** information
- Photo gallery preview cards
- Mobile-responsive hamburger menu

### Photo Gallery (gallery.html)
- Lightbox viewer with full-screen photos
- Keyboard navigation (arrow keys, escape)
- Click images to view full size

### Weather & Trails (weather-trails.html)
- Live Windy.com weather radar
- National Weather Service forecast
- SLEDNH interactive trail map
- Snow depth information

### Events Calendar (events.html)
- Embedded Google Calendar
- Event types reference
- Meeting location and details

### Quick Links (landing.html)
- QR code friendly page
- Contact information
- Social media links
- Billy Vandervalk contact info

## 📞 Common Questions

**Q: I edited the file but changes don't show**
A: Clear your browser cache (Ctrl+F5) or try incognito mode

**Q: How do I edit on my phone?**
A: Use a text editor app, or set up Netlify for easier mobile editing

**Q: How do I add new pages?**
A: Copy an existing HTML file, modify the content, and add a link to it in the navigation menu

**Q: How much does hosting cost?**
A: FREE with Netlify, GitHub Pages, or Cloudflare Pages. Only pay for custom domain ($12/year)

**Q: Can I update the Google Calendar?**
A: Yes! Log into your club's Google Calendar and add events. They'll automatically show on the website.

## 🎯 Next Steps

1. **Customize the content** - Update names, contact info, links
2. **Choose a host** - I recommend Netlify for beginners
3. **Test it out** - Make sure all links work
4. **Create QR codes** - For the landing page
5. **Share with the club** - Get feedback!

## 📝 Editing Tips

- **Always save a backup** before making major changes (see 0-ARCHIVE folder)
- **Test locally** - Open the HTML file in your browser before uploading
- **Start small** - Change one thing at a time
- **Keep it updated** - Add trail conditions and club updates regularly
- **Most recent first** - Always add new updates at the top

## 📂 File Organization Tips

- Keep all photos in `3-MEDIA/1-Photos/`
- Save documentation in `2-DOCUMENTATION/`
- Archive old versions in `0-ARCHIVE/` with dates
- Use descriptive filenames for photos

---

**Website last updated:** December 5, 2024

Want to add more features? Contact your web developer! 🏔️❄️
