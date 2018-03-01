export const asyncAddTodo = (database, dispatch) => async text => {
  dispatch({ type: "INACTIVE_ADD_TODO" });
  const newKey = database.ref().push().key;
  let newObj = {};
  const newItem = { text: text, status: false, key: newKey };
  newObj[newKey] = newItem;
  dispatch({ type: "ADD_TODO", el: newItem });
  await database.ref().update(newObj);
  dispatch({ type: "ADD_TODO_SUCCESS" });
  dispatch({ type: "ACTIVE_ADD_TODO" });
};
export const asyncChangeStatus = (database, dispatch) => async key => {
  dispatch({ type: "CHANGE_STATUS_TODO", key: key });
  dispatch(async (dis, getSt) => {
    console.log("getSt()", getSt());
    console.log("getSt", getSt);
    const oldElem = getSt().todoReducer.list.filter(el => el.key === key)[0];
    let newObj = {};
    newObj[key] = Object.assign({}, oldElem);
    !newObj[key].status;
    await database.ref().update(newObj);
    dispatch({ type: "CHANGE_STATUS_TODO_SUCCESS", key: key });
  });
};
export const asyncGetDataFromServer = (database, dispatch) => async () => {
  let keys = [],
    arr = [],
    todoList = null;
  await database
    .ref("/")
    .once("value")
    .then(lol => (todoList = lol.val()));
  keys = Object.keys(todoList || []);
  arr = keys.map(key => todoList[key]);
  console.log("inid disp");
  dispatch({ type: "INIT_TODO_LIST", todoList: { list: arr } });
  dispatch({ type: "ACTIVE_ADD_TODO" });
};
export const asyncDeleteByKey = (database, dispatch) => async key => {
  dispatch({ type: "DELETE_TODO", key: key });
  dispatch(async (dis, getSt) => {
    console.log("getSt()", getSt());
    console.log("getSt", getSt);
    const oldElem = getSt().todoReducer.list.filter(el => el.key === key)[0];
    let newObj = {};
    newObj[key] = null;
    await database.ref().update(newObj);
    dispatch({ type: "DELETE_TODO_SUCCESS", key: key });
  });
};
