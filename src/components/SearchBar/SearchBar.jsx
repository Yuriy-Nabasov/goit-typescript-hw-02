import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSearch }) {
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
    </Formik>
  );
}
