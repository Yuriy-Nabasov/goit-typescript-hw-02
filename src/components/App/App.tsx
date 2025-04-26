import React, { useState, useEffect } from "react";
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

// Типи для стану
interface Article {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface AppState {
  articles: Article[];
  isLoading: boolean;
  error: boolean;
  searchTerm: string;
  page: number;
  modalIsOpen: boolean;
  selectedImage: string;
  selectedImageTitle: string;
}

// Типи для пропсів
interface SearchBarProps {
  onSearch: (topic: string) => void;
}

interface ImageGalleryProps {
  items: Article[];
  openModal: (imageUrl: string, imageTitle: string) => void;
}

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled: boolean;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  imageTitle: string;
}

Modal.setAppElement("#root");

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(``);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>("");

  const handleSearch = (topic: string): void => {
    setSearchTerm(`${topic}/${Date.now()}`);
    setPage(1);
    setArticles([]);
  };

  useEffect(() => {
    if (searchTerm === ``) {
      return;
    }
    // async function getData() {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchArticles(searchTerm.split(`/`)[0], page);
        setArticles((prevArticles) => [...prevArticles, ...data]);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [searchTerm, page]);

  const openModal = (imageUrl: string, imageTitle: string): void => {
    if (!modalIsOpen) {
      setSelectedImage(imageUrl);
      setSelectedImageTitle(imageTitle);
      setModalIsOpen(true);
    }
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setSelectedImage("");
    setSelectedImageTitle("");
  };

  return (
    <Section>
      <Container>
        <Heading
          title="Search for images from Unsplash using TypeScript"
          bottom
          tag={`h1`}
        />
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
};

export default App;
