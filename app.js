const fs = require('fs');

class ProductManager {
    // constructor
    constructor(filePath) {
        this.path = filePath;
        this.initializeFile();
        this.nextId = this.getNextID(); // acomoda los id según los productos que tenemos
    }

    // inicialización del archivo
    initializeFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    // función para incrementar el id
    getNextID() {
        const products = this.getProductsFromFile();
        if (products.length === 0) {
            return 1;
        }

        const maxID = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxID + 1;
    }

    // método para agregar productos
    addProduct(product) {
        const products = this.getProductsFromFile();
        product.id = this.nextId;
        this.nextId += 1;

        products.push(product);
        this.saveProductsToFile(products);
    }

    // método para mostrar productos
    getProducts() {
        return this.getProductsFromFile();
    }

    // método para mostrar productos por id
    getProduct(id) {
        const products = this.getProductsFromFile();
        return products.find(e => e.id === id);
    }

    // método para actualizar o cambiar productos
    updateProduct(id, updateFields) {
        const products = this.getProductsFromFile();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updateFields };
            this.saveProductsToFile(products);
        }
    }

    // método para eliminar productos por id
    deleteProduct(id) {
        let products = this.getProductsFromFile();
        products = products.filter(p => p.id !== id); // Corregido aquí
        this.saveProductsToFile(products);
    }

    // método para leer el archivo y devolver todos los productos
    getProductsFromFile() {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
    }

    // método para guardar productos en un archivo
    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

const manager = new ProductManager('products.json');

// añadir productos de ejemplo
// manager.addProduct({
//     title: "Producto A",
//     description: "Excelente unidad a la venta",
//     price: 200,
//     thumbnail: 'ruta',
//     codigo: "ABC111",
//     stock: 4000
// });
// manager.addProduct({
//     title: "Producto B",
//     description: "Excelente unidad a la venta",
//     price: 100,
//     thumbnail: 'ruta',
//     codigo: "CDDS2",
//     stock: 50
// });
// manager.addProduct({
//     title: "Producto C",
//     description: "Excelente unidad a la venta",
//     price: 2050,
//     thumbnail: 'ruta',
//     codigo: "FG100",
//     stock: 10000
// });

// borrar producto con id 1
// manager.deleteProduct(9);

// obtener los productos después de borrar
// todosproductos = manager.getProducts();
// console.log("Después de borrar:", todosproductos);

// manager.updateProduct(3,{price:10 , stock: 1})
