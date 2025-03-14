import { createBrowserRouter } from 'react-router-dom';
import GuestLayout from './layouts/guestLayout.jsx';
import Auth from './views/Auth.jsx';
import DefaultLayout from './layouts/defaultLayout.jsx';
import Home from './views/(protected)/Home.jsx';
import Search from './views/(protected)/searchBook.jsx';
import Index from './views/landingPage.jsx';
import UserSavedBooks from './views/(protected)/bookmark.jsx';
import ReadingHistory from './views/(protected)/readHistory.jsx';
import Contact from './views/contactUs.jsx';
import About from './views/about.jsx';
import Faqs from './views/faqs.jsx';
import Dictionaries from './views/(protected)/dictionaries.jsx';
import Articles from './views/(protected)/articles.jsx';
import ProfileUpdate from './views/(protected)/ProfileUpdate.jsx';
import ForgotPassword from './views/ForgotPassowrd.jsx';
import UserMessage from './layouts/userMessage.jsx';
// import ErrorPage from './views/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/faqs',
        element: <Faqs />,
      },
      {
        path: '/reset-password',
        element: <ForgotPassword />,
      }
    ]
  },
  {
    path: '/home',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <UserMessage />,
      },
      {
        path: '/home/Ebooks',
        element: <Home />,
      },
      {
        path: '/home/saved-books',
        element: <UserSavedBooks />,
      },
      {
        path: '/home/reading-history',
        element: <ReadingHistory />,
      },
      {
        path: '/home/dictionaries',
        element: <Dictionaries />,
      },
      {
        path: '/home/articles',
        element: <Articles />,
      },
      {
        path: '/home/page/:page',
        element: <Home />,
      },
      {
        path: '/home/search/',
        element: <Search />,
      },
      {
        path: '/home/user/update-profile',
        element: <ProfileUpdate />, 
      }
    ]
  },
  // {
  //   path: '*', undefined pages (404 error)
  //   element: <ErrorPage />,
  // }
]);

export default router;
