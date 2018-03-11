export default store => next => action => {
  console.log("store-->", store);
  next(action);
};
