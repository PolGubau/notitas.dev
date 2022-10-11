import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { removeTodoItem } from "../../utils/managingNotes";
import { updateLocalStorage } from "../../utils/storage/updateLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import styles from "./TodoItem.module.scss";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteActioncreator } from "@/redux/features/categorySlice";
const TodoItem = ({
  id,
  title,
  description,
  creationDate,
  isCompleted,
  todoList,
  actualCategory,
  setActualCategory,
  setTodoList,
}) => {
  const dispatch = useDispatch();

  const todoRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [deletable, setDeletable] = useState(false);

  const deleteById = (idToRemove) => {
    dispatch(deleteNoteActioncreator(idToRemove));
  };

  return (
    <motion.div
      ref={todoRef}
      layout
      key={id}
      className={styles.todo + " " + (open ? styles.open : "")}
      drag
      onClick={() => setOpen(!open)}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
      whileDrag={{ scale: 1.3, zIndex: 100 }}
      onPan={(event, info) => {
        //canceling the drag
        event.stopPropagation();
        if (info.offset.y > 0) {
          todoRef.current.style.backgroundColor = `rgba(${
            215 + info.offset.y / 2
          }, ${227 - info.offset.y / 3}, ${251 - info.offset.y / 3}, 0.3)`;
          info.offset.y > 250 ? setDeletable(true) : setDeletable(false);
        }
      }}
      onPanEnd={(event, info) => {
        info.offset.y > 250
          ? deleteById(id)
          : (todoRef.current.style.backgroundColor = "#d7e3fb");
      }}
    >
      <div className={styles.todoContainer}>
        {deletable && <FaTrashAlt />}
        <div className={styles.todoText}>
          <p className={styles.title}>{title}</p>
          {open ? <p className={styles["description"]}>{description}</p> : ""}
        </div>
      </div>
      <motion.div className={styles["delete"]} onClick={() => deleteById(id)}>
        <span>
          <CgClose size={15} />
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TodoItem;
