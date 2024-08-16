
document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperatureInput');
    const toggleButton = document.getElementById('toggleButton');
    const result = document.getElementById('result');

    let isCelsius = true;

    function convertTemperature(temp) {
        if (isCelsius) {
            return (temp * 9/5) + 32;
        } else {
            return (temp - 32) * 5/9; 
        }
    }

    async function updateResult() {
        const inputValue = parseFloat(temperatureInput.value);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }
            const data = await response.json();
            const windSpeed = data.wind.speed;
    
            document.getElementById('wind-speed').textContent = `Скорость ветра: ${windSpeed} м/с`;
        } catch (error) {
            document.getElementById('wind-speed').textContent = `Ошибка: ${error.message}`;
        }

        if (isNaN(inputValue)) {
            result.textContent = 'Введите корректное значение температуры.';
            return;
        }

        const convertedTemp = convertTemperature(inputValue);
        const unit = isCelsius ? '°F' : '°C';
        result.textContent = `Результат: ${convertedTemp.toFixed(2)} ${unit}`;
    }

    toggleButton.addEventListener('click', () => {
        isCelsius = !isCelsius;
        toggleButton.textContent = isCelsius ? 'Переключить на °F' : 'Переключить на °C';
        updateResult();
    });

    temperatureInput.addEventListener('input', updateResult);

    
});
