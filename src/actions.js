export const asyncAddTodo = (database, dispatch) => async text => {
  dispatch({ type: "INACTIVE_ADD_TODO" });
  const newKey = database.ref().push().key;
  let newObj = {};
  const newItem = { text: text, status: false, key: newKey };
  newObj[newKey] = newItem;
  dispatch({ type: "ADD_TODO", payload: { newItem } });
  await database.ref().update(newObj);
  dispatch({ type: "ADD_TODO_SUCCESS" });
  dispatch({ type: "ACTIVE_ADD_TODO" });
};
export const asyncChangeStatus = (database, dispatch) => async key => {
  dispatch({ type: "CHANGE_STATUS_TODO", payload: { key } });
  dispatch(async (dis, getSt) => {
    const oldElem = getSt().list.filter(el => el.key === key)[0];
    let newObj = {};
    newObj[key] = Object.assign({}, oldElem);
    !newObj[key].status;
    await database.ref().update(newObj);
    dispatch({ type: "CHANGE_STATUS_TODO_SUCCESS", payload: { key } });
  });
};
export const asyncGetDataFromServer = (database, dispatch) => async () => {
  const firebaseValue = database.ref("/").once("value");
  console.log("getDataFromServer");
  try {
    dispatch({ type: "RUN_SPINNER" });
    await new Promise((res, rej) => {
      firebaseValue.then(data => {
        const todoList = data.val(),
          keys = Object.keys(todoList || []),
          arr = keys.map(key => todoList[key]);
        dispatch({ type: "INIT_TODO_LIST", payload: { list: arr } });
        dispatch({ type: "ACTIVE_ADD_TODO" });
        res();
      });
      setTimeout(() => rej("TIMEOUT_CONNECTION"), 5000);
    });
  } catch (e) {
    console.warn("bad connection");
    dispatch({ type: "INIT_TODO_LIST_ERROR" });
  } finally {
    dispatch({ type: "STOP_SPINNER" });
  }
};
export const asyncDeleteByKey = (database, dispatch) => async key => {
  dispatch({ type: "DELETE_TODO", payload: { key } });
  dispatch(async (dis, getSt) => {
    const oldElem = getSt().list.filter(el => el.key === key)[0];
    let newObj = {};
    newObj[key] = null;
    await database.ref().update(newObj);
    dispatch({ type: "DELETE_TODO_SUCCESS", payload: { key } });
  });
};
