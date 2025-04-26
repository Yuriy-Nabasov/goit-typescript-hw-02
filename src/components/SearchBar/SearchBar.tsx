import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

interface FormValues {
  topic: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ topic: "" }}
      onSubmit={(values, actions) => {
        if (values.topic.trim() === "") {
          toast.error("Please enter a search term!");
        } else {
          onSearch(values.topic);
          actions.resetForm();
        }
      }}
    >
      {(props: FormikProps<FormValues>) => (
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="topic"
            autoComplete="on"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
