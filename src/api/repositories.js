export async function getProductsFromServer() {
    try {
        const response = await fetch('https://dev-su.eda1.ru/test_task/products.php');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function saveOrderToServer(order) {
    try {
        const response = await fetch("https://dev-su.eda1.ru/test_task/save.php", {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        ).then((response) => { return response.json() })
        .then((data) => (data));
        return await response;
    } catch (error) {
        console.error(error);
    }
}