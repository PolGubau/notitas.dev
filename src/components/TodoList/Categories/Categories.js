import styles from "./Categories.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
// import { LOCAL_STORAGE_KEY } from "../../../utils/constants";
// import Swal from "sweetalert2";
import { handleNewCategory } from "../../../utils/managingCategories";
export default function Categories({
  setActualCategory,
  actualCategory,
  allCategories,
  setTodoList,
  todoList,
}) {
  console.log(allCategories);
  return (
    <section className={styles.container}>
      {allCategories.map((category) => (
        <p
          className={
            actualCategory === category ? styles.active : styles.inactive
          }
          key={category}
          onClick={() => {
            setActualCategory(category);
          }}
        >
          {category}
        </p>
      ))}
      <div
        className={styles.addButton}
        onClick={() =>
          handleNewCategory(setActualCategory, setTodoList, todoList)
        }
      >
        <AiOutlinePlus />
      </div>
    </section>
  );
}
