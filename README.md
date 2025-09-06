# Netflix Clone

A fully responsive Netflix clone built with React, featuring Firebase authentication and movie search functionality.

## ✨ Features

### 🔐 Authentication
- **Email/Password Sign In**: Traditional login with email and password
- **Google Authentication**: One-click sign in with Google account
- **Protected Routes**: Access control for authenticated users only
- **User Profile**: Display user information and logout functionality

### 🔍 Search Functionality
- **Real-time Search**: Search movies as you type
- **Smart Filtering**: Search by title, description, or genre
- **Search Results Display**: Dedicated search results page with movie cards
- **Search Toggle**: Expandable search input in the navbar

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Flexible Layouts**: Adaptive grid and flexbox layouts
- **Touch-Friendly**: Mobile-optimized interactions and buttons
- **Cross-Browser Compatible**: Works across all modern browsers

### 🎬 Movie Features
- **Movie Cards**: Attractive movie display with hover effects
- **Category Browsing**: Browse movies by different categories
- **Hero Section**: Featured movie with play and info buttons
- **Smooth Scrolling**: Horizontal scrolling for movie lists

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **Firebase 11** - Authentication and backend services
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with flexbox and grid

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swayampanda9001/Netflix-Clone.git
   cd Netflix-Clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google providers
   - Copy your Firebase config and update `src/Firebase.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🔧 Configuration

### Firebase Setup
Update the Firebase configuration in `src/Firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Google Authentication
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Google sign-in provider
3. Add your domain to authorized domains

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎨 Key Components

### Authentication Components
- `Login.jsx` - Login/Signup form with Google auth
- `Navbar.jsx` - Navigation with user profile and logout

### Movie Components
- `TitleCards.jsx` - Movie card displays
- `Search.jsx` - Search input component
- `SearchResults.jsx` - Search results display

### Context
- `MovieContext.jsx` - Global state for movie data and search

## 🔒 Security Features

- **Protected Routes**: Redirect unauthenticated users to login
- **Firebase Security Rules**: Secure backend data access
- **Input Validation**: Form validation for user inputs
- **Error Handling**: Comprehensive error handling for auth and API calls

## 🚀 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image sizing and loading
- **CSS Optimization**: Efficient CSS with minimal reflows
- **Bundle Optimization**: Optimized build with Vite

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- [ ] Movie details modal
- [ ] Video player integration
- [ ] User watchlists
- [ ] Movie recommendations
- [ ] Dark/Light theme toggle
- [ ] Offline support with PWA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Swayam Panda**
- GitHub: [@swayampanda9001](https://github.com/swayampanda9001)

## 🙏 Acknowledgments

- Netflix for design inspiration
- Firebase for authentication services
- React community for excellent documentation
- All contributors and testers
