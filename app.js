// app.js
const forms = document.querySelectorAll(".signup-form");//regresa un arreglo con la clase signup-form

// console.log(forms);

const getTemplate = () => {
    return fetch("./template.html")
        .then((response) => response.text());
};

const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address,
            template: template,
        }),
    })
        .then((results) => {
            console.log(results);
            document.getElementById("email").value = ""
            alert("E-mail send!!!")
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("email").value = ""
            alert("Send failed")
        });
};

const sendEmail = (miVariable) => {
    miVariable.preventDefault();//Evita que se recargue la página al hacer clic en el botón
    const email = miVariable.target.querySelector("input").value;//Regresa el primer elemento input,en este caso sólo hay uno
    getTemplate()
        .then((template) => {
            sendEmailToApi(email,template)
            //console.log(template)
        })
        .catch((error) => {
            console.log(error, "error al obtener el template")
        })

}

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", sendEmail)
}
