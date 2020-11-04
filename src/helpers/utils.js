export const createThumb = (e, callback) => {
    e.preventDefault();
    if(!e.target.files[0])
        return
    const file = new FileReader();
    const arquivo = e.target.files[0];
    file.readAsDataURL(arquivo);

    file.onloadend = (event) => {

        callback(event.target.result);

    };
};