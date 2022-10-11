import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TodoItem from "../TodoItem";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { itemVariants } from "./animations";
import styles from "./TodoList.module.scss";
import Categories from "./Categories/Categories";
import { FORM_VALIDATIONS } from "../../utils/formValidation";
import FormTodo from "../FormTodo/FormTodo";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDataActioncreator,
  addNoteActioncreator,
  addCategoryActioncreator,
} from "@/redux/features/categorySlice";
import { getLocalStorage } from "@/utils/storage/getLocalStorage";

const TodoList = () => {
  // State
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const [actualCategory, setActualCategory] = useState("Todas");
  const dispatch = useDispatch();

  // Loading redux State and putting into todoList var

  const allNotes = [];
  const allCategories = [];

  useEffect(() => {
    console.log("Taking data");
    const data = getLocalStorage(LOCAL_STORAGE_KEY);
    dispatch(loadDataActioncreator(data));
    todoList.map((category) => {
      allCategories.push(category.title);
      category.content.forEach((note) => {
        allNotes.push(note.payload);
      });
    });
  }, []);
  const todoList = useSelector((state) => state.categories);
  console.log(todoList);

  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Take the focus event on change notes array
  const addTodoItem = () => {
    const inputValue = titleRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const category = categoryRef.current.value;
    const uniqueId = `${inputValue[0]}#${Date.now()}`;
    const date = new Date();

    const newTodo = {
      id: uniqueId,
      title: inputValue,
      description: descriptionValue,
      category: category,
      isCompleted: false,
      creationDate: date,
    };

    const formValidationsPassed = FORM_VALIDATIONS.isNotEmpty(
      titleRef.current.value.length
    );
    if (formValidationsPassed) {
      if (!allCategories.includes(category)) {
        const newCategory = {
          title: category,
          content: [newTodo],
        };
        dispatch(addCategoryActioncreator(newCategory));
      } else {
        const newTodoList = todoList.map((category) => {
          if (category.title === newTodo.category) {
            return {
              ...category,
              content: [...category.content, newTodo],
            };
          } else {
            return category;
          }
        });
        setTodoList(newTodoList);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodoList));
      }

      //move the actual category to the one that has the new note
      setActualCategory(category);

      titleRef.current.value = "";
      descriptionRef.current.value = "";
    } else {
      showErrorForSeconds(5);
      setErrorCount(errorCount + 1);
    }
  };

  const showErrorForSeconds = (seconds) => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, seconds * 1000);
  };

  return (
    <div className={styles["todo-list"]}>
      <div className={styles["todo-list__header"]}>
        <h1 className={styles["todo-list__title"]}>
          Notitas{" "}
          {actualCategory !== "Todas" && <span>en {actualCategory}</span>}
        </h1>
        {allCategories.length > 0 &&
          (console.log(allCategories),
          (
            <Categories
              todoList={todoList}
              // setTodoList={setTodoList}
              allCategories={allCategories}
              setActualCategory={setActualCategory}
              actualCategory={actualCategory}
            />
          ))}
      </div>
      <motion.div className={styles["todo-list-container"]}>
        {allNotes.length === 0
          ? ""
          : actualCategory === "Todas"
          ? allNotes.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  creationDate={todo.creationDate}
                  isCompleted={todo.isCompleted}
                  animationVariants={itemVariants}
                  todoList={todoList}
                  actualCategory={actualCategory}
                  setActualCategory={setActualCategory}
                  // setTodoList={setTodoList}
                />
              );
            })
          : //show the notes of the category selected
            todoList
              .filter((category) => category.title === actualCategory)
              .map((category) => {
                return category.content.map((todo) => {
                  return (
                    <TodoItem
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      creationDate={todo.creationDate}
                      isCompleted={todo.isCompleted}
                      animationVariants={itemVariants}
                      todoList={todoList}
                      actualCategory={actualCategory}
                      setActualCategory={setActualCategory}
                      // setTodoList={setTodoList}
                    />
                  );
                });
              })}
      </motion.div>
      <FormTodo
        nodetitleRef={titleRef}
        nodeDescriptionRef={descriptionRef}
        categoryRef={categoryRef}
        addTodoItem={addTodoItem}
        categoriesAbailable={allCategories}
        hasError={hasError}
        setHasError={setHasError}
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        todoList={todoList}
      />
    </div>
  );
};

export default TodoList;
