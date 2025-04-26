import { useState, useEffect } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Heading from "../Heading/Heading";
import { Analytics } from "@vercel/analytics/react";

import SearchBar from "../SearchBar/SearchBar";
import { fetchArticles } from "../../articleService";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMassage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";

Modal.setAppElement("#root");

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(``);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");

  const handleSearch = (topic) => {
    setSearchTerm(`${topic}/${Date.now()}`);
    setPage(1);
    setArticles([]);
    // if (topic === ``) {
    //   toast.error("Please enter keyword!");
    // }
  };

  useEffect(() => {
    if (searchTerm === ``) {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchArticles(searchTerm.split(`/`)[0], page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchTerm, page]);

  const openModal = (imageUrl, imageTitle) => {
    if (!modalIsOpen) {
      setSelectedImage(imageUrl);
      setSelectedImageTitle(imageTitle);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
    setSelectedImageTitle("");
  };

  return (
    <Section>
      <Container>
        <Heading title="Search for images from Unsplash" bottom tag={`h1`} />
        <SearchBar onSearch={handleSearch} />
        {error && <ErrorMassage />}
        {articles.length > 0 && (
          <ImageGallery items={articles} openModal={openModal} />
        )}
        {isLoading && <Loader />}

        {articles.length > 0 && (
          <LoadMoreBtn onClick={() => setPage(page + 1)} disabled={isLoading} />
        )}
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage}
          imageTitle={selectedImageTitle}
        />
        <Toaster />
        <Analytics />
      </Container>
    </Section>
  );
}
