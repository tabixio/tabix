export default key => value => {
    localStorage.setItem(key, value |> JSON.stringify);
    return value;
};