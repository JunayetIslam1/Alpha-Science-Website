import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ClassesPage from "./pages/ClassesPage";
import ClassPage from "./pages/ClassPage";
import VideosPage from "./pages/VideosPage";
import WatchPage from "./pages/WatchPage";
import PostsPage from "./pages/PostsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="classes/:no" element={<ClassPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="watch/:id" element={<WatchPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
