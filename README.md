# David Picillo - Professional blog

A modern, responsive blogwebsite showcasing the professional experience and skills.

## 🌟 Features

- **Bilingual Support**: Complete German/English language toggle with browser language detection
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with orange accent colors
- **SEO Optimized**: Comprehensive meta tags, structured data, and search engine optimization
- **PWA Ready**: Progressive Web App support with manifest and service worker
- **Performance Optimized**: Compressed assets, caching, and optimized loading

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern flexbox and grid layouts
- **Icons**: Ionicons for consistent iconography
- **Fonts**: Google Fonts (Poppins)
- **SEO**: Schema.org structured data, Open Graph, Twitter Cards
- **Performance**: .htaccess optimization, asset compression

## 📁 Project Structure

```
vCard-blog/
├── src/
│   ├── styles/
│   │   └── main.css          # Main stylesheet
│   ├── scripts/
│   │   └── blog.js      # Main JavaScript functionality
│   └── assets/
│       ├── images/           # Profile images and photos
│       └── icons/            # Icon assets
├── index.html                # Main HTML file
├── manifest.json             # PWA manifest
├── robots.txt               # Search engine directives
├── sitemap.xml              # Site structure for search engines
├── .htaccess                # Server configuration
└── README.md                # Project documentation
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vCard-blog.git
   cd vCard-blog
   ```

2. **Local Development**
   - Open `index.html` in your browser, or
   - Use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:3000
   ```

3. **Access the website**
   - Open your browser and navigate to `http://localhost:3000`

## 🌐 Language Support

The blogsupports both German and English languages:

- **Default Language**: English (with automatic browser language detection)
- **Language Toggle**: Top-right corner flag buttons
- **Persistent Selection**: Language preference saved in localStorage
- **Complete Translation**: All content available in both languages

## 📱 Responsive Design

The blogis fully responsive and optimized for:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎨 Design Features

- **Color Scheme**: Professional white background with orange (#F97316) accents
- **Typography**: Poppins font family for modern readability
- **Animations**: Smooth transitions and hover effects
- **Interactive Elements**: Clickable contact icons and navigation
- **Modern Layout**: Clean sections with proper spacing and hierarchy

## 📊 SEO & Performance

### SEO Features
- Meta tags for description, keywords, and author
- Open Graph tags for social media sharing
- Twitter Card support
- Schema.org structured data (Person, Organization)
- Canonical URLs and proper heading structure

### Performance Optimizations
- Compressed CSS and JavaScript
- Optimized images with proper alt tags
- Browser caching via .htaccess
- Preloaded critical resources
- Lazy loading for non-critical images

## 🔧 Customization

### Updating Content
1. **Personal Information**: Edit the contact details in `index.html`
2. **Professional Experience**: Update the resume section with new positions
3. **Skills**: Modify the skills section with relevant technologies
4. **Styling**: Customize colors and layout in `src/styles/main.css`

### Adding New Sections
1. Add HTML structure in `index.html`
2. Include both German and English content with appropriate `data-lang` attributes
3. Style the new section in `src/styles/main.css`
4. Update navigation if needed in `src/scripts/blog.js`

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/vCard-blog`

### Custom Domain
1. Update all URLs in the code from `localhost` to your domain
2. Update `sitemap.xml` with your domain
3. Configure your hosting provider
4. Update DNS settings if using a custom domain

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About David Picillo

Cloud DevOps Engineer with expertise in:
- Cloud Infrastructure (AWS, Azure)
- DevOps & CI/CD Pipelines
- System Integration & Automation
- Modern Web Technologies

**Contact**: [david@picillo.de](mailto:david@picillo.de)
**Website**: [david.picillo.de](https://david.picillo.de)

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed instructions on:

- Automatic GitHub Pages deployment via GitHub Actions
- Setting up CloudFront CDN for improved performance
- Custom domain configuration
- SSL certificate setup
- Performance monitoring and optimization

### Quick Start
1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. The workflow will automatically deploy on every push to `main`

---

*Built with ❤️ and modern web technologies*
