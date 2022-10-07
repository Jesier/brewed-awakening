import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findProduct = (order, products) => {
    let orderProduct = null

    for (const product of products) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    let orderEmployee = null

    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    html += "<ul>"

    for (const order of orders) {
        const employee = findEmployee(order, employees)
        const product = findProduct(order, products)

        html += `<li>${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }

    html += "</ul>"

    return html
}

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("product")) {
            const [,productId] = itemClicked.id.split("--")
            
            for (const product of products) {
                if (product.id === parseInt(productId)) {
                    window.alert(`${product.name} costs ${product.price}`)
                }
            }
        }
    }
)
// function just to count up everytime someone has sold an order
const employeeOrders = (employee) => {
    let soldProducts = 0

    for (const order of orders) {
        if (order.employeeId === employee.id) {
            soldProducts= soldProducts + 1
        }
    }
    return soldProducts
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("employee")) {
            const [,employeeId] = itemClicked.id.split("--")

            for (const employee of employees) {
                if (employee.id === parseInt(employeeId)) {

                    const orderCount = employeeOrders(employee)

                    window.alert(`${employee.name} sold ${orderCount} products`)
                }
            }
        }
    }
)