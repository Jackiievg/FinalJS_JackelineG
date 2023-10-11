document.addEventListener("DOMContentLoaded", function () {
    const registrationDiv = document.querySelector(".registration");
    const formDiv = document.querySelector(".form");
    const foodSelect = document.getElementById("food");
    const quantityInput = document.getElementById("quantity");
    const calculateButton = document.getElementById("calculate-button");
    const resultDiv = document.getElementById("result");
    const toggleButton = document.getElementById("toggle-registration");
    const registerButton = document.getElementById("register-button");
    
    let userRegistered = false; // Variable para ver si el usuario está registrado

    // Aqui utilizo esta funcion para el cálculo de calorías
    function calculateCalories() {
        const selectedFoodCalories = parseFloat(foodSelect.value);
        const quantity = parseFloat(quantityInput.value);

        if (isNaN(selectedFoodCalories) || isNaN(quantity)) {
            resultDiv.textContent = "Por favor, ingresa una cantidad válida.";
        } else {
            const totalCalories = (selectedFoodCalories * quantity) / 100;
            resultDiv.textContent = `Total de calorías: ${totalCalories.toFixed(2)} kcal`;
        showDespedida();
        }
    }
    // esta es la función para mostrar el mensaje de despedida
function showDespedida() {
    document.getElementById("despedida").classList.remove("hidden");
}
    // Evento para abrir o cerrar el formulario de registro
    toggleButton.addEventListener("click", () => {
        if (registrationDiv.style.right === "0px" || registrationDiv.style.right === "") {
            registrationDiv.style.right = "-320px"; // Oculta el formulario
        } else {
            registrationDiv.style.right = "0"; 
        }
    });
    function toggleFormVisibility() {
        registrationDiv.classList.add("hidden");
        formDiv.classList.remove("hidden");
    }

    // Evento cuando se hace clic en el botón de registro
    registerButton.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validación de usuario y contraseña
    if (username && password) {
        userRegistered = true;
        toggleFormVisibility();
        
        // Mostrar SweetAlert de registro exitoso
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Ahora puedes calcular las calorías.',
        });
    } else {
        // Mostrar SweetAlert de error en la validación
        Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: 'Por favor, ingresa un nombre de usuario y contraseña válidos.',
        });
    }
    });
    // Evento al hacer clic en el botón de cálculo 
    calculateButton.addEventListener("click", () => {
        if (userRegistered) {
            calculateCalories();
        } else {
            // con un SweetAlert muestar que debe registrarse primero el usuario
            Swal.fire({
                icon: 'error',
                title: 'Debes registrarte primero',
                text: 'Regístrate antes de calcular las calorías.',
            });
        }
    });
    
    // Evento al hacer clic en el botón "Sí" para realizar otro cálculo
    const otroCalculoButton = document.getElementById("otro-calculo-button");
    otroCalculoButton.addEventListener("click", () => {
        document.getElementById("despedida").classList.add("hidden");
        resultDiv.textContent = "";
        quantityInput.value = "100";
    });
    
    // Evento al hacer clic en el botón "No" para salir
    const salirButton = document.getElementById("salir-button");
    salirButton.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: '¡Hasta luego!',
            text: 'Gracias por usar nuestra calculadora de calorías. ¡Vuelve pronto!',
        });
        resultDiv.textContent = "";
        formDiv.classList.add("hidden");
    });
    // Cargar datos desde el archivo JSON
    fetch("productos.json")
    .then(response => response.json())
    .then(data => {
            data.forEach(food => {
                const option = document.createElement("option");
                option.value = food.caloriesPer100g;
                option.textContent = food.foodName;
                foodSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar los datos del archivo JSON:", error));
        localStorage.clear();
});
